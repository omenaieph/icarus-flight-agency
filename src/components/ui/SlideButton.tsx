"use client";

import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
  type JSX,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Check, Loader2, SendHorizontal, X } from "lucide-react";
import styles from "./SlideButton.module.css";

const DRAG_CONSTRAINTS = { left: 0, right: 228 }; // 288px container - 60px button
const DRAG_THRESHOLD = 0.9;

const BUTTON_STATES = {
  initial: { width: "18rem" }, // 288px
  completed: { width: "3.75rem" }, // 60px
};

const ANIMATION_CONFIG = {
  spring: {
    type: "spring" as const,
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  },
};

type StatusIconProps = {
  status: string;
};

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const iconMap: Record<StatusIconProps["status"], JSX.Element> = useMemo(
    () => ({
      loading: <Loader2 className={styles.spin} size={24} />,
      success: <Check size={24} />,
      error: <X size={24} />,
    }),
    []
  );

  if (!iconMap[status]) return null;

  return (
    <motion.div
      key={status}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      {iconMap[status]}
    </motion.div>
  );
};

const useButtonStatus = (resolveTo: "success" | "error", onComplete?: () => void) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = useCallback(() => {
    setStatus("loading");
    setTimeout(() => {
      setStatus(resolveTo);
      if (onComplete) {
        setTimeout(onComplete, 800); // Give user time to see success state
      }
    }, 1500);
  }, [resolveTo, onComplete]);

  return { status, handleSubmit };
};

interface SlideButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onSlideComplete?: () => void;
  text?: string;
}

export const SlideButton = forwardRef<HTMLButtonElement, SlideButtonProps>(
  ({ className, onSlideComplete, text = "Slide to send inquiry", ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [completed, setCompleted] = useState(false);
    const dragHandleRef = useRef<HTMLDivElement | null>(null);
    const { status, handleSubmit } = useButtonStatus("success", onSlideComplete);

    const dragX = useMotionValue(0);
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring);
    const dragProgress = useTransform(
      springX,
      [0, DRAG_CONSTRAINTS.right],
      [0, 1]
    );

    const handleDragStart = useCallback(() => {
      if (completed) return;
      setIsDragging(true);
    }, [completed]);

    const handleDragEnd = () => {
      if (completed) return;
      setIsDragging(false);

      const progress = dragProgress.get();
      if (progress >= DRAG_THRESHOLD) {
        setCompleted(true);
        handleSubmit();
      } else {
        dragX.set(0);
      }
    };

    const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (completed) return;
      const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right));
      dragX.set(newX);
    };

    const handleContainerClick = () => {
      if (completed || isDragging) return;
      
      // Auto complete the slide
      dragX.set(DRAG_CONSTRAINTS.right);
      setCompleted(true);
      handleSubmit();
    };

    // The background progress width starts at 60px (hidden entirely under the button) and expands
    const adjustedWidth = useTransform(springX, (x) => x + 60); 
    
    // Fade out text as we drag
    const textOpacity = useTransform(dragProgress, [0, 0.5], [1, 0]);

    return (
      <motion.div
        animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
        transition={ANIMATION_CONFIG.spring}
        className={`${styles.container} ${className || ""}`}
        onClick={handleContainerClick}
      >
        {!completed && (
          <>
            <motion.div
              style={{ width: adjustedWidth }}
              className={styles.progressBg}
            />
            <motion.span style={{ opacity: textOpacity }} className={styles.placeholderText}>
              {text}
            </motion.span>
          </>
        )}
        
        <AnimatePresence>
          {!completed && (
            <motion.div
              ref={dragHandleRef}
              drag="x"
              dragConstraints={DRAG_CONSTRAINTS}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrag={handleDrag}
              style={{ x: springX }}
              className={styles.dragHandle}
              onClick={(e) => e.stopPropagation()} // Prevent double trigger when grabbing the button
            >
              <button
                type="button"
                className={`${styles.iconButton} ${isDragging ? styles.iconButtonDragging : ""}`}
              >
                <SendHorizontal size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {completed && (
            <motion.div
              className={styles.completedContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                ref={ref}
                type="button"
                disabled={status === "loading"}
                {...props}
                className={styles.completedButton}
              >
                <AnimatePresence mode="wait">
                  <StatusIcon key={status} status={status} />
                </AnimatePresence>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

SlideButton.displayName = "SlideButton";
