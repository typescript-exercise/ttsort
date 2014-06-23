describe('Graph Class', () => {
    var graph : ttsort.Graph;
    var node1 : ttsort.Node;
    var node2 : ttsort.Node;
    var node3 : ttsort.Node;
    
    describe('addNodes のテスト', () => {
        
        beforeEach(() => {
            graph = new ttsort.Graph();
        });
        
        it('from で指定したノードの出力ノードに to で指定したノードが設定される', () => {
            // exercise
            graph.addNodes(node('node1'), node('node2'));
            
            // verify
            node1 = graph.getNode('node1');
            node2 = graph.getNode('node2');
            expect(node1.getNextNodes()[0]).toBe(node2);
        });
        
        it('from が登録済みの場合、既存の from ノードに to で指定したノードが追加される', () => {
            // exercise
            graph.addNodes(node('node1'), node('node2'));
            graph.addNodes(node('node1'), node('node3'));
            
            // verify
            node1 = graph.getNode('node1');
            node3 = graph.getNode('node3');
            expect(node1.getNextNodes()[1]).toBe(node3);
        });
        
        it('to が登録済みの場合、既存の to ノードが使用されること', () => {
            // exercise
            graph.addNodes(node('node1'), node('node2'));
            graph.addNodes(node('node3'), node('node2'));
            
            // verify
            node1 = graph.getNode('node1');
            node3 = graph.getNode('node3');
            expect(node1.getNextNodes()[0]).toBe(node3.getNextNodes()[0]);
        });
        
        function node(name : string) : ttsort.Node {
            return new ttsort.Node(name);
        }
    });
    
    describe('hasEdge のテスト', () => {
        
        beforeEach(() => {
            graph = new ttsort.Graph();
            node1 = new ttsort.Node('node1');
            node2 = new ttsort.Node('node2');
        });
        
        it('登録されているノードのうち、１つでも出力ノードを持つノードが存在する場合、 hasEdge は true を返す', () => {
            // setup
            graph.addNodes(node1, node2);
            
            // exercise
            var actual = graph.hasEdge();
            
            // verify
            expect(actual).toBe(true);
        });
        
        it('登録されているノードが全て出力ノードを持たない場合、 hasEdge は false を返す', () => {
            // setup
            graph.addNodes(node1, node2);
            node2.removePreviousNode(node1);
            
            // exercise
            var actual = graph.hasEdge();
            
            // verify
            expect(actual).toBe(false);
        });
    });
    
    
    it('getEntryNodes で、入力を持たないノードが全て取得できる', () => {
        // setup
        graph = new ttsort.Graph();
        node1 = new ttsort.Node('node1');
        node2 = new ttsort.Node('node2');
        node3 = new ttsort.Node('node3');
        
        graph.addNodes(node1, node2);
        graph.addNodes(node3, node2);
        
        // exercise
        var entries = graph.getEntryNodes();
        
        // verify
        expect(entries.length).toBe(2);
        expect(entries).toContain(node1);
        expect(entries).toContain(node3);
    });
});

