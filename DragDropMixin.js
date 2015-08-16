
'use strict';

var _ = lodash;

var DragDropMixin = {
    /*
     *  usage:
     *
     *  mixins: [DragDropMixin],
     *  dragDrop: function () {
     *
     *     return {
     *
     *         // when dragging an item
     *         draggable: true,
     *         dropType: 'myItem',
     *         dataTransfer: { myItemData: property }
     *
     *         // when dropping an item:
     *         droppable: true,
     *         acceptableDrops: ['myItem'],
     *         drop: function (myItem) {},
     *     };
     *  }
     *
     */
    isAttrEnabled: function (attr) {
        return this.dragDropData && this.dragDropData[attr];
    },
    isDroppable: function () {
        return this.isAttrEnabled('droppable');
    },
    isDraggable: function () {
        return this.isAttrEnabled('draggable');
    },
    componentDidMount: function () {
        var node = this.getDOMNode();

        this.dragDropData = this.dragDrop();

        if (this.isDroppable()) {
            node.ondragover = this.handleDragOver;
            node.ondrop = this.handleDrop;
        }

        if (this.isDraggable()) {
            node.draggable = true;
            node.ondragstart = this.handleDragStart;
        }
    },
    componentWillUnmount: function () {
        var node = this.getDOMNode();

        if (this.isDroppable()) {
            node.removeEventListener('dragover', this.handleDragOver);
            node.removeEventListener('drop', this.handleDrop);
        }

        if (this.isDraggable()) {
            node.removeEventListener('dragstart', this.handleDragStart);
        }
    },
    handleDragOver: function (e) {
        e.preventDefault();
    },
    handleDrop: function (e) {
        var jsonData = e.dataTransfer.getData('objToPass'),
            passedObj = JSON.parse(jsonData),
            acceptableDrops = this.dragDropData.acceptableDrops;

        e.preventDefault();

        if (!this.dragDropData.drop) {
            throw new Error('Must define drop function when using droppable');
        }

        if (_.includes(acceptableDrops, passedObj.dropType)) {
            this.dragDropData.drop(passedObj.data);
        }

    },
    handleDragStart: function (e) {
        var objToPass = {
            data: this.dragDropData.dataTransfer,
            dropType: this.dragDropData.dropType
        };

        e.dataTransfer.setData('objToPass', JSON.stringify(objToPass));
    }
};

