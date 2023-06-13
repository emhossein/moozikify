import * as React from "react";

import { animated, useSpring } from "react-spring";

import { useGesture } from "react-use-gesture";

function HorizontalScrollView(props) {
  const ref = React.useRef();
  const isDragging = React.useRef(false);
  const [{ x }, set, stop] = useSpring(() => ({ x: 0 }));
  const bind = useGesture(
    {
      onDrag({ down, movement: [x], first, last, vxvy: [vx] }) {
        if (first) isDragging.current = true;
        if (last) setTimeout(() => (isDragging.current = false), 0);
        set({ x: -x, immediate: down });
      },

      onWheelStart({ down, movement: [x], first, last, vxvy: [vx] }) {
        if (first) isDragging.current = true;
        if (last) setTimeout(() => (isDragging.current = false), 0);
        set({ x: -x, immediate: down });
      },
    },
    {
      drag: {
        axis: "x",
        filterTaps: true,
        initial() {
          return [-ref.current.scrollLeft, 0];
        },
      },
    }
  );

  return (
    <animated.div
      ref={ref}
      scrollLeft={x}
      className={props.className}
      {...bind()}
    >
      {props.children}
    </animated.div>
  );
}

export default HorizontalScrollView;
