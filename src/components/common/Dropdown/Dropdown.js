import * as React from "react";
import classNames from "classnames";

import styles from "./dropdown.module.scss";

export default function Dropdown({ children, shouldPresent }) {
  const ref = React.useRef();

  const [maxHeight, setMaxHeight] = React.useState("0");
  const [verticleAnchor, setVerticleAnchor] = React.useState("top");
  const [verticleOffset, setVerticleOffset] = React.useState("0px");

  const additionalOffset = 8;
  const distanceFromEdge = 16;

  const setDropdownMaxHeight = (
    windowHeight,
    parentRect,
    totalHeightOffset,
    anchorProperty
  ) => {
    let availableSpace;
    if (anchorProperty === "bottom") {
      availableSpace = parentRect.top;
    }
    if (anchorProperty === "top") {
      availableSpace = windowHeight - parentRect.bottom;
    }
    setMaxHeight(availableSpace - totalHeightOffset);
  };

  const setVerticleAnchorProperty = (parentRectTop, windowHeight) => {
    if (parentRectTop > windowHeight / 2) {
      setVerticleAnchor("bottom");
      return "bottom";
    } else {
      setVerticleAnchor("top");
      return "top";
    }
  };

  const getValues = () => {
    const mainRect = document
      .getElementById("main-portal-root")
      .getBoundingClientRect();
    const parentRect = ref.current.parentNode.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const halfHeaderPlusFooter = (windowHeight - mainRect.height) / 2;
    const totalHeightOffset =
      distanceFromEdge + additionalOffset + halfHeaderPlusFooter;

    return {
      windowHeight,
      parentRect,
      additionalOffset,
      totalHeightOffset,
    };
  };

  const setDropdownProperties = (
    windowHeight,
    parentRect,
    additionalOffset,
    totalHeightOffset
  ) => {
    const anchorProperty = setVerticleAnchorProperty(
      parentRect.top,
      windowHeight
    );
    setVerticleOffset(parentRect.height + additionalOffset);
    setDropdownMaxHeight(
      windowHeight,
      parentRect,
      totalHeightOffset,
      anchorProperty
    );
  };

  React.useEffect(() => {
    const { windowHeight, parentRect, additionalOffset, totalHeightOffset } =
      getValues();
    setDropdownProperties(
      windowHeight,
      parentRect,
      additionalOffset,
      totalHeightOffset
    );
  }, [shouldPresent]);

  const listClass = classNames(styles.dropdown, {
    [styles.shouldPresent]: shouldPresent,
  });

  return (
    <ul
      ref={ref}
      className={listClass}
      style={{
        [verticleAnchor]: verticleOffset,
        ...(shouldPresent ? { maxHeight: maxHeight } : null),
      }}
    >
      {children}
    </ul>
  );
}
