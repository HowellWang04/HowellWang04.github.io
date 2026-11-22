// Pop-up windows draw their own slim scrollbar. Chrome's native one ignores the rounded corners and widens on hover,
// which squeezes the content and nudges it sideways. The dialog holds a [data-dialog-scroll] element that does the
// scrolling with its native bar hidden (global.css); this lays a thumb over its right edge, clear of the corners,
// that follows the scroll and can be dragged.
const inset = 20;

export const attachScrollbar = (dialog: HTMLDialogElement) => {
  const scroller = dialog.querySelector<HTMLElement>("[data-dialog-scroll]")!;
  const thumb = document.createElement("div");
  thumb.className = "dialog-thumb";
  thumb.setAttribute("aria-hidden", "true");
  dialog.append(thumb);

  const update = () => {
    const { scrollTop, scrollHeight, clientHeight } = scroller;
    const track = clientHeight - inset * 2;
    const height = Math.max(32, (track * clientHeight) / scrollHeight);
    const travel = scrollHeight - clientHeight;
    thumb.hidden = travel < 1;
    thumb.style.height = `${height}px`;
    thumb.style.transform = `translateY(${inset + (travel > 0 ? ((track - height) * scrollTop) / travel : 0)}px)`;
  };

  scroller.addEventListener("scroll", update, { passive: true });
  // Opening the dialog, resizing the window, and content that grows (expanded details, loaded images) all change it.
  const resize = new ResizeObserver(update);
  resize.observe(scroller);
  [...scroller.children].forEach((child) => resize.observe(child));

  thumb.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    thumb.setPointerCapture(event.pointerId);
    thumb.classList.add("is-dragging");
    const startY = event.clientY;
    const startTop = scroller.scrollTop;
    const move = (moveEvent: PointerEvent) => {
      const travel = scroller.scrollHeight - scroller.clientHeight;
      const track = scroller.clientHeight - inset * 2 - thumb.offsetHeight;
      scroller.scrollTop = startTop + ((moveEvent.clientY - startY) * travel) / track;
    };
    thumb.addEventListener("pointermove", move);
    thumb.addEventListener("lostpointercapture", () => {
      thumb.removeEventListener("pointermove", move);
      thumb.classList.remove("is-dragging");
    }, { once: true });
  });

  return scroller;
};
