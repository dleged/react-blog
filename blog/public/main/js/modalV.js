/**
 * Created by $ on 2017/11/5.
 */
!function($,doc,global){
    'use strict'
    var modalTagArr =
     [
            {
                tag: 'div',
                staticClass: 'modal-t',
                childrens:[
                    {
                        tag: 'h2',
                    },
                    {
                        tag: 'div',
                        staticClass: 'close',
                    }
                ]
            },
            {
                tag: 'div',
                staticClass: 'modal-c'
            },
            {
                tag: 'div',
                staticClass: 'modal-b'
            }
     ]

    function ModalV(title,content,buttons){
        this.title = title || '提示';
        this.content = content || '';
        this.buttons = buttons || '';
        return this.install();
    }

    /*modalV节点实例缓存池*/
    ModalV.modalCaches = [];
    ModalV.instance = {};
    ModalV.prototype.renderModals = function(modalTagArr){
            if(!ModalV.modalCaches[0]){
                var modalv = ModalV.renderModal(modalTagArr);
                ModalV.modalCaches.push(modalv);
            }else{
                var modalv = ModalV.modalCaches.shift();
                $('body').append(modalv);
            }
            return modalv;
    }

    ModalV.prototype.install = function(){
        var modalv = this.renderModals(modalTagArr);
        this.modalv = modalv;
        this.renderData();
        modalv.find('.close').one('click',function(){
            this.close();
        }.bind(this));
        modalv.one('click',function(event){
            var target = event.target.className || event.srcElement.className;
            if(target.toLocaleLowerCase() === 'modal-overlay'){
                this.close();
            }
        }.bind(this));
        return modalv;
    }

    ModalV.prototype.renderData = function(){
        var modalv = this.modalv;
        modalv.find('h2').html(this.title);
        modalv.find('.modal-c').html(this.content);
        modalv.find('.modal-b').html(this.buttons);
    }

    ModalV.prototype.close = function(){
        this.destroy();
    }
    ModalV.prototype.destroy = function(){
        var modalv = this.modalv;
        modalv.find('h2').html('');
        modalv.find('modal-c').html('');
        modalv.find('modal-b').html('');
        modalv.remove();
        ModalV.modalCaches.push(modalv);
    }
    ModalV.createElement = function(obj){
        var ele = obj['tag'] && doc.createElement(obj['tag']);
        if(obj['staticClass']){
            ele.className = obj['staticClass'];
        }
        if(obj['childrens']){
            ModalV.renderChildren($(ele),obj['childrens']);
        }
        return $(ele);
    }
    ModalV.renderChildren = function(par,childrenList){
        for(var i = 0,children; children = childrenList[i++];){
            var childrenEle = this.createElement(children);
            par.append(childrenEle);
        }
    }
    /*创建弹窗*/
    ModalV.renderModal = function(obj){
        var modalv = $('<div class="modal-overlay"><div class="modal-v"></div></div>');
        this.renderChildren(modalv.find('.modal-v'),obj);
        $('body').append(modalv);
        return modalv;
    }

    global.ModalV = ModalV;
}(jQuery,document,window)
