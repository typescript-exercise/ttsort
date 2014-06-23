describe('TTsort Class', () => {
    var tsort : ttsort.TTSort;
    var graph : ttsort.Graph;
    var node1 : ttsort.Node;
    var node2 : ttsort.Node;
    var node3 : ttsort.Node;
    var node4 : ttsort.Node;
    
    beforeEach(() => {
        graph = new ttsort.Graph();
        node1 = createNode('node1');
        node2 = createNode('node2');
        node3 = createNode('node3');
        node4 = createNode('node4');
        tsort = new ttsort.TTSort(graph);
    });
    
    it('循環が存在しない場合、トポロジカルソートが完了する', () => {
        // setup
        graph.addNodes(node1, node2);
        graph.addNodes(node3, node2);
        graph.addNodes(node2, node4);
        
        // exercise
        var nodes = tsort.sort();
        
        // verify
        expect(nodes).toEqual([node3, node1, node2, node4]);
    });
    
    it('循環が存在する場合、例外がスローされる', () => {
        // setup
        graph.addNodes(node1, node2);
        graph.addNodes(node2, node3);
        graph.addNodes(node3, node4);
        graph.addNodes(node4, node2);
        
        // exercise - verify
        try {
            tsort.sort();
            throw 'fail';
        } catch (e) {
            expect(e).toBe('循環している部分があります。');
        }
    });
});

function createNode(name : string) : ttsort.Node {
    return new ttsort.Node(name);
}
