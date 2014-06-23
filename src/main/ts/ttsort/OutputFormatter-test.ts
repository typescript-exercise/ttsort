describe('OutputFormatter Class', () => {
    it('ノードの名前を縦一列に並べた文字列にフォーマットする', () => {
        // setup
        var node1 = new ttsort.Node('node1');
        var node2 = new ttsort.Node('node2');
        var node3 = new ttsort.Node('node3');
        var node4 = new ttsort.Node('node4');
        
        var nodes : ttsort.Node[] = [node3, node2, node4, node1];
        
        var formatter = new ttsort.OutputFormatter();
        
        // exercise
        var actual = formatter.format(nodes);
        
        // verify
        expect(actual).toBe('node3\nnode2\nnode4\nnode1');
    });
});
