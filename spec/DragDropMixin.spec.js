/**
 * Created by itaysh on 8/12/15.
 */

var DragDropMixin = require('../dist/DragDropMixin');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('DragDropMixin', function () {

    var element = null,
        elementDrag = null;

    beforeEach(function () {
        global.document = require('jsdom').jsdom();
        global.window = global.document.defaultView;

        var Comp = React.createClass({
            mixins: [DragDropMixin],
            render: function render() {
                return React.createElement('div', {});
            }
        });

        var CompDrag = React.createClass({
            mixins: [DragDropMixin],
            dragDrop: function dragDrop() {
                return {
                    draggable: true,
                    dropType: 'test',
                    dataTransfer: {
                        test: true
                    }
                };
            },
            render: function render() {
                return React.createElement('div', {});
            }
        });

        element = React.createElement(Comp,{});
        elementDrag = React.createElement(CompDrag,{});

    });

    it('should load', function () {
        expect(DragDropMixin).toBeDefined();
    });

    it('should throw when called without dragDrop function', function () {
        expect(TestUtils.renderIntoDocument.bind(null, element)).toThrow();
    });

    it('should attach drag functionality when configured', function () {
        var rendered = TestUtils.renderIntoDocument(elementDrag);

        expect(rendered.getDOMNode().draggable).toBe(true);
    });

});