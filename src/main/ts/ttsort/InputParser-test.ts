describe('InputFormatter Class', () => {
    var parser : ttsort.InputParser;
    
    beforeEach(() => {
        parser = new ttsort.InputParser();
    });
    
    
    it('forEachEntries で、入力値を各行ごとにイテレートできる', () => {
        // setup
        var input = 'a b\n'
                  + 'b  c\n'
                  + 'e x\n';
        
        var froms : string[] = [];
        var tos : string[] = [];
        
        // exercise
        parser.forEachEntries(input, (from : string, to : string) => {
            froms.push(from);
            tos.push(to);
        });
        
        // verify
        expect(froms).toEqual(['a', 'b', 'e']);
        expect(tos).toEqual(['b', 'c', 'x']);
    });
    
    it('入力が空の場合、例外がスローされること', () => {
        // exercise
        try {
            parser.forEachEntries('', (from, to) => {});
            throw 'fail'
        } catch (e) {
            expect(e).toBe('Input が入力されていません。');
        }
    });
    
    it('to が設定されていない行がある場合、例外がスローされること', () => {
        // setup
        var input = 'a b\n'
                  + 'a  \n';
        
        // exercise
        try {
            parser.forEachEntries(input, (from, to) => {});
            throw 'fail'
        } catch (e) {
            expect(e).toBe('Input のフォーマットが不正です。');
        }
    });
    
    it('from to が余分に設定されていない行がある場合、例外がスローされること', () => {
        // setup
        var input = 'a b\n'
                  + 'a b c\n';
        
        // exercise
        try {
            parser.forEachEntries(input, (from, to) => {});
            throw 'fail'
        } catch (e) {
            expect(e).toBe('Input のフォーマットが不正です。');
        }
    });
});
