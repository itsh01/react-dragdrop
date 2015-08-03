# React DragDropMixin

A lightweight DragDropMixin for ReactJS components

## Usage

* Include the mixin in the components
* Create a dragDrop function to define configuration
```
mixins: [DragDropMixin],
dragDrop: function () {
    return {
        // configuration goes here
    };
},
```

When configuring a draggable item
```
    return {
        draggable: true, // Allow dragging
        dropType: 'myItem', // Define type to be used in droppable item
        dataTransfer: { myItemData: property } // Data to pass to droppable item
    }
```

When dropping an item
```
    return {
        droppable: true, // Allow  dropping
        acceptableDrops: ['myItem'], // Type of draggables to allow
        drop: function (myItem) {} // Callback to execute when dropping
    };
```

## License

MIT. See LICENSE for more info.