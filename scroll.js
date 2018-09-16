var myScroll = {
    refresh: '', // 下拉刷新
};
var dom = document.getElementsByClassName('myscroll');
var str = '<div class="myscroll-refresh">';
    str += '<i class="iconfont icon-web-icon-"></i>';
    str += '<i class="iconfont icon-web-icon-1"></i>';
    str += '<i class="iconfont icon-jiazai myscroll-d"></i>';
    str += '<span class="myscroll-text">下拉刷新...</span>';
    str += '</div>';
    str += '<div class="myscroll-main">';
    str += '</div>';

for (var i = 0; i < dom.length; i++) {
    var children = [];
    for (var j = 0; j < dom[i].children.length; j++) {
        children.push(dom[i].children[j].cloneNode(true));
    }
    dom[i].innerHTML = str;
    var domChild = dom[i].children[1];
    for (var j in children) {
        domChild.appendChild(children[j]);
    }
    var scrollTop = 0; // 滚动条距离
    var pageY = 0;
    var isTrue = true;
    var isRefresh = false; // 是否处于下拉刷新请求数据中
    var nY = 0; // 下拉的长度
    dom[i].addEventListener('touchmove', function (e) {
        e = e || window.event;
        scrollTop = document.documentElement.scrollTop;
        if (isRefresh) return false;;
        if (scrollTop <= 0) {
            if (isTrue) {
                pageY = e.touches[0].pageY;
                isTrue = false;
            }
            var y = e.touches[0].pageY;
            nY = (y - pageY) / 4;
            if (nY < 50) {
                this.children[0].style.marginTop = nY - 50 + 'px';
            } else if (nY >= 50 && nY < 70) {
                this.children[0].children[0].style.display = 'none';
                this.children[0].children[1].style.display = 'inline';
                this.children[0].style.marginTop = nY - 50 + 'px';
                this.children[0].children[3].innerText = '松开刷新...';
            }
        }
    });
    dom[i].addEventListener('touchend', function (e) {
        var self = this;
        var run = false;
        if (nY < 50) {
            setMargin(this);
        } else {
            this.children[0].children[1].style.display = 'none';
            this.children[0].children[2].style.display = 'inline-block';
            this.children[0].children[3].innerText = '正在刷新...';
            isRefresh = true;
        }
    });
}

function setMargin (self) {
    var run = false;
    run = setInterval(function () {
        var top = parseInt(self.children[0].style.marginTop);
        top -= 2.2;
        self.children[0].style.marginTop = top + 'px';
        if (top <= -60) {
            clearInterval(run);
        }
    }, 10);
}