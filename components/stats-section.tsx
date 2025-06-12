"use client";

import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, Award, Heart } from "lucide-react";
import { LucideIcon } from "lucide-react"; // Import LucideIcon type

// Define the props interface for the Counter component
interface CounterProps {
  from: number;
  to: number;
  suffix: string;
  Icon: LucideIcon; // Use LucideIcon type for the icon component
  label: string;
}

// A helper component to handle the counting animation
function Counter({ from, to, suffix, Icon, label }: CounterProps) {
  const nodeRef = useRef<HTMLHeadingElement>(null); // Specify the ref type as HTMLHeadingElement
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 }); // Trigger once when 50% in view

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      if (node) {
        const controls = animate(from, to, {
          duration: 2, // Animation duration in seconds
          onUpdate(value) {
            node.textContent = Math.round(value) + suffix;
          },
        });
        return () => controls.stop();
      }
    }
  }, [from, to, suffix, isInView]);

  return (
    <Card className="border-none bg-primary/5p bg-red/10">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <Icon className="mb-4 h-8 w-8 text-primary" />
        {/* Initial value for SSR, will be updated by the animation */}
        <h3 className="mb-2 text-3xl font-bold" ref={nodeRef}>
          {from}
          {suffix}
        </h3>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

// Define the interface for a single stat object
interface Stat {
  value: string;
  label: string;
  icon: LucideIcon; // Use LucideIcon type
  maxValue: number;
  suffix: string;
}

const stats: Stat[] = [
  {
    value: "300+",
    label: "Police Wives Reached",
    icon: Users,
    maxValue: 300, // Added for counting
    suffix: "+",
  },
  {
    value: "10+",
    label: "Years of Service",
    icon: Calendar,
    maxValue: 10,
    suffix: "+",
  },
  {
    value: "50+",
    label: "Successful Projects",
    icon: Award,
    maxValue: 50,
    suffix: "+",
  },
  {
    value: "100+",
    label: "Widows Supported",
    icon: Heart,
    maxValue: 100,
    suffix: "+",
  },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-red/5 mb-16 container">
      <motion.div style={{ opacity, y }} className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Counter
              key={index}
              from={0} // Start counting from 0
              to={stat.maxValue}
              suffix={stat.suffix}
              Icon={stat.icon} // Pass the icon component
              label={stat.label}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}