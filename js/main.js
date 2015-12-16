$(document).ready(function() {
    $('.js_main_input').focus();
    var todoList = $('.todoList'),
        idMask = 'task_';

    function showTasks() {
        // пустое или нет хранилище
        var lsLen = localStorage.length;
        if (lsLen > 0){
            for ( var i= 0; i<lsLen; i++ ) {
                // проходим по каждому эл-ту хранилища
                var key = localStorage.key(i);
                if (key.indexOf(idMask) == 0){
                    $('<li></li>')
                        .html('<span class="item-text">' + localStorage.getItem(key) + '</span>')
                        .addClass(key)
                        .attr('data-taskid', key)
                        .appendTo(todoList);
                    $('<span></span>').addClass('item-delete btn glyphicon glyphicon-trash').appendTo($('.'+key));
                    $('<span></span>').addClass('item-edit btn glyphicon glyphicon-pencil').appendTo($('.'+key));
                }
            }
        }
    }
    showTasks();

    $('.js_main_input').on('keydown', function(e){
        if (e.keyCode != 13)
            return;

        // записываем текст в переменную
        var text = e.target.value;
        // и очищаем инпут
        e.target.value = '';

        if (text.length > 0){
            var taskId = 0;
            // проходим по элементам списка, определяем максимальный айди
            todoList.children().each(function(i, element) {
                var thisId = $(element).attr('data-taskid').slice(5);
                if (thisId > taskId){
                    taskId = thisId;
                }
            });
            taskId++;

            //записываем в сторедж значение
            localStorage.setItem(idMask+taskId, text);

            // добавляем лишку с текстом из инпута
            $('<li></li>')
                .html('<span class="item-text">' + text + '</span>')
                .attr('data-taskid', idMask+taskId)
                .addClass(idMask+taskId)
                .appendTo(todoList);
            $('<span></span>').addClass('item-delete btn glyphicon glyphicon-trash').appendTo($('.'+idMask+taskId));
            $('<span></span>').addClass('item-edit btn glyphicon glyphicon-pencil').appendTo($('.'+idMask+taskId));
        }
    });

    // клик по кнопке удалить
    $('.todoList').on('click', '.item-delete', function(e){
        e.preventDefault();
        var curItem = $(this).parent();
        var curKey = curItem.attr('data-taskid');
        localStorage.removeItem(curKey);
        curItem.toggle().remove();
    });
    // клик по кнопке редактировать.
    $('.todoList').on('click', '.item-edit', function(e) {
        e.preventDefault();
        var curItem = $(this).parent();
        var curKey = curItem.attr('data-taskid');
        var curText = curItem.children('.item-text').text();
        curItem.children('.item-text').hide();
        $('<input type="text" class="form-control item-edit-input"/>').appendTo(curItem);
        curItem.children('.item-edit-input').val(curText).focus();
    });

    // сохранение отредаченного текста
    $('.todoList').on('keydown', '.item-edit-input', function(e) {

        var thisInput = $(this);
        if (e.keyCode == 27) {
            console.log('aaaaa');
            thisInput.closest('li').find('.item-text').fadeIn();
            thisInput.hide().remove();
            return;
        }
        if (e.keyCode != 13) {
            return;

        }


        // записываем текст в переменную
        var text = e.target.value;
        // записываем новое значение в сторедж
        var key = thisInput.parent('li').attr('data-taskid');
        localStorage.setItem(key, text);
        // выставляем новое значение, прячем инпут
        thisInput.closest('li').find('.item-text').fadeIn().text(text);
        thisInput.hide().remove();

    });



});