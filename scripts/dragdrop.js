export function dragDrop(sourceNode, destinationNode) {
    const dataTransfer = new DataTransfer();

    const dragStartEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true,
        dataTransfer
    });
    sourceNode.dispatchEvent(dragStartEvent);

    const dragEnterEvent = new DragEvent('dragenter', {
        bubbles: true,
        cancelable: true,
        dataTransfer
    });
    destinationNode.dispatchEvent(dragEnterEvent);

    const dragOverEvent = new DragEvent('dragover', {
        bubbles: true,
        cancelable: true,
        dataTransfer
    });
    destinationNode.dispatchEvent(dragOverEvent);

    const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer
    });
    destinationNode.dispatchEvent(dropEvent);

    const dragEndEvent = new DragEvent('dragend', {
        bubbles: true,
        cancelable: true,
        dataTransfer
    });
    sourceNode.dispatchEvent(dragEndEvent);
}