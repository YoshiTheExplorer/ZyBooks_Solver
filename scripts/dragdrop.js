export async function dragDrop(sourceNode, destNode) {
    const src_rect = sourceNode.getBoundingClientRect();
    const dst_rect = destNode.getBoundingClientRect();
    const src_x = src_rect.left + src_rect.width / 2;
    const src_y = src_rect.top + src_rect.height / 2;
    const dst_x = dst_rect.left + dst_rect.width / 2;
    const dst_y = dst_rect.top + dst_rect.height / 2;

    const mockDataTransfer = {
        dropEffect: 'move', // Set the dropEffect property
        effectAllowed: 'move', // You can set other properties as well

        // Mock the setData method
        setData: function(format, data) {
            this[format] = data; // Store the data as a property on the mock object
        },

        // Mock the getData method
        getData: function(format) {
            return this[format]; // Return the stored data
        },
    };

    sourceNode.draggable = 'true';

    const dragStartEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true,
        clientX: src_x,
        clientY: src_y,
        dataTransfer: mockDataTransfer,
    });
    sourceNode.dispatchEvent(dragStartEvent);

    const dragEnterEvent = new DragEvent('dragenter', {
        bubbles: true,
        cancelable: true,
        dataTransfer: mockDataTransfer,
    });
    sourceNode.dispatchEvent(dragEnterEvent);

    // const dragOverEvent = new DragEvent('dragover', {
    //     bubbles: true,
    //     cancelable: true,
    //     effectAllowed: 'move',
    //     dataTransfer
    // });
    // destinationNode.dispatchEvent(dragOverEvent);

    const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        clientX: dst_x,
        clientY: dst_y,
        dataTransfer: mockDataTransfer,
    });
    sourceNode.dispatchEvent(dropEvent);

    // const dragEndEvent = new DragEvent('dragend', {
    //     bubbles: true,
    //     cancelable: true,
    //     effectAllowed: 'move',
    //     dataTransfer
    // });
    // sourceNode.dispatchEvent(dragEndEvent);
}