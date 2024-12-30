import React from "react";

interface ClickableAreaProps {
  /*
   * The reference to the link that will be navigated to when
   * clicking on the ClickableArea-component
   */
  linkRef: any;
  /*
   * What HTML element you want the clickable area to be
   * (for example <div> or <li>)
   */
  type: any;
  /*
   * ClassName is added to be able to overwrite styles with
   * styled-components
   */
  className?: string;

  children?: React.ReactNode;
}

/*
 * The Clickable Area component is base on the methods suggested by
 * Heydon Pickering in his project #Inclusive components"
 * ref https://inclusive-components.design/cards/
 *
 * The Purpose
 * The purpose is to make card experience better for keyboard users
 * and for those who use screen readers, while still making the whole
 * card clickable.
 *
 * How to use it:
 * 1. Wrap the area you want to be clickable with a mouse in the
 *    ClickableArea-component
 * 2. Wrap the title/heading of the component in a <Link>, to make
 *    the actuall link something semtantic (what is to be read aloud
 *    by screen readers).
 * 3. Add a ref to the component like this:
 *    const linkRef: any = useRef();
 * 4. Set the linkRef by passing it to the <Link> as a prop like this:
 *    innerref={linkRef}
 * 5. Pass the reference to the <ClickableArea> like this:
 *    linkRef={linkRef}
 */

const ClickableArea: React.FunctionComponent<ClickableAreaProps> = ({
  linkRef,
  children,
  className,
  type,
}) => {
  let up: Date, down: Date;

  const registerMouseDown = () => {
    down = new Date();
  };

  const goToLink = (e: React.MouseEvent<any>) => {
    up = new Date();
    // Only navigate to link if it was a click by left mouse button
    const didLeftClick = e.button === 0;

    let notLongPress = false;
    // Making sure the user did not mean to select something
    if (!!up && !!down) {
      notLongPress = up.valueOf() - down.valueOf() < 200;
    }

    if (didLeftClick && notLongPress) {
      linkRef && linkRef.current && linkRef.current.click();
    }
  };

  const ClickableElement = type;
  return (
    <ClickableElement
      className={className}
      onMouseDown={registerMouseDown}
      onMouseUp={goToLink}
    >
      {children}
    </ClickableElement>
  );
};

export default ClickableArea;
