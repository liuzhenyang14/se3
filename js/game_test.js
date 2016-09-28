describe('paint', function(){
	//测试paint函数
	it('should be a function', function(){
		assert.isFunction(paint);
	});
});

describe('sur_or_die', function(){
    //测试paint函数
    it('should be a function', function(){
        assert.isFunction(sur_or_die);
    });
});

describe('sur_num', function(){
    it('should be a function', function(){
        assert.isFunction(sur_num);
    });
    it('should have 2 arguments', function(){
        assert.equal(sur_num.length, 2);
    });
    it('should return a integer', function(){
        var test_x = 5, test_y = 4;
        assert.equal(sur_num(test_x, test_y), 4);
    });
    it('should return -1 when the arguments are not integer or out of range', function(){
        var test_x = 'a', test_y = 'b';
        var test_x1 = -1, test_y1 = 15;
        assert.equal(sur_num(test_x, test_y), -1);
        assert.equal(sur_num(test_x1, test_y1), -1);
    });
});

describe('start', function(){
    it('should be a function', function(){
        assert.isFunction(start);
    });
})