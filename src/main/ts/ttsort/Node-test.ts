describe('Node Class', () => {
    it('toString でコンストラクタで取得した名前が取得できる', () => {
        // setup
        var node = new ttsort.Node('node-name');
        
        // exercise
        var actual = node.toString();
        
        // verify
        expect(actual).toBe('node-name');
    });
    
    describe('addNextNode でノードを追加した場合', () => {
        
        var node1 : ttsort.Node;
        var node2 : ttsort.Node;
        var node3 : ttsort.Node;
        
        beforeEach(() => {
            node1 = new ttsort.Node('node1');
            node2 = new ttsort.Node('node2');
            node3 = new ttsort.Node('node3');
            
            node1.addNextNode(node2);
            node1.addNextNode(node3);
        });
        
        it('getNextNodes で追加したノードが取得できる', () => {
            // verify
            expect(node1.getNextNodes()[0]).toBe(node2);
            expect(node1.getNextNodes()[1]).toBe(node3);
        });
        
        it('getPreviousNodes で追加されたノードが取得できる', () => {
            // verify
            expect(node2.getPreviousNodes()[0]).toBe(node1);
            expect(node3.getPreviousNodes()[0]).toBe(node1);
        });
        
        it('入力のあるノードは、 isEntryNode が false を返す', () => {
            // verify
            expect(node2.isEntryNode()).toBe(false);
        });
        
        it('入力のないノードは、 isEntryNode が true を返す', () => {
            // verify
            expect(node1.isEntryNode()).toBe(true);
        });
        
        it('出力のないノードは、 hasNextNode が false を返す', () => {
            // verify
            expect(node2.hasNextNode()).toBe(false);
        });
        
        it('出力のあるノードは、 hasNextNode が true を返す', () => {
            // verify
            expect(node1.hasNextNode()).toBe(true);
        });
        
        it('forEachNextNode で、次のノードをイテレートできる', () => {
            // setup
            var nodes : ttsort.Node[] = [];
            
            // exercise
            node1.forEachNextNode((next : ttsort.Node) => {
                nodes.push(next);
            });
            
            // verify
            expect(nodes[0]).toBe(node2);
            expect(nodes[1]).toBe(node3);
        });
        
        it('removePreviousNode で指定したノードとの関連が除去される', () => {
            // exercise
            node2.removePreviousNode(node1);
            
            // verify
            expect(node2.getPreviousNodes().length).toBe(0);
            expect(node1.getNextNodes().length).toBe(1);
            expect(node1.getNextNodes()[0]).toBe(node3);
        });
        
        it('既に同じノードが追加されている場合、ノードは追加されない', () => {
            // exercise
            node1.addNextNode(node2);
            
            // verify
            expect(node1.getNextNodes().length).toBe(2);
        });
    });
});

