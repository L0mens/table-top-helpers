/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem) {
    elem.on(name, fn);
  });
};

exports.$ = $;
exports.$$ = $$;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classSelected = "player-1";
var terrainSelected;
var mode = "perso";

function changeSelected() {
    console;
    Array.from(document.getElementsByClassName('list-item')).forEach(function (elem) {
        Array.from(elem.getElementsByTagName("li")).forEach(function (li) {
            console.log(li.className == classSelected);
            if (li.className.toLowerCase() == classSelected) {
                activeItemInList(li);
            }
        });
    });
}

/**
 * Reset tous les items pour remettre la classe selectionné au bon
 * @param {*} id ID pour identifier le LI à cibler avec $() 
 */

function activeItemInList(id) {

    Array.from(document.getElementsByClassName('list-item')).forEach(function (elem) {
        Array.from(elem.getElementsByTagName("li")).forEach(function (li) {
            li.classList.remove("item-selected-on-list");
        });
    });
    id.classList.add("item-selected-on-list");
}

function removeAllClasses(element) {
    element.classList.forEach(function (classe) {
        element.classList.remove(classe);
    });
}

var cases = Array.from(document.getElementsByClassName('case'));

cases.forEach(function (c) {
    c.addEventListener('click', function () {
        if (mode == "perso") {
            var listC = this.classList;
            console.log(listC);
            if (listC.length > 1) {
                console.log(classSelected);
                classSelected = listC[1];
            }
            changeSelected();
            Array.from(document.getElementsByClassName(classSelected)).forEach(function (e) {
                e.classList.remove(classSelected);
            });
            this.classList.add(classSelected);
        } else if (mode == "terrain") {
            removeAllClasses(this.children[0]);
            this.children[0].classList.add(terrainSelected);
        }
        //console.log(this.children[0]);
    });
});

Array.from(document.getElementsByClassName('list-item')).forEach(function (elem) {
    Array.from(elem.getElementsByTagName("li")).forEach(function (li) {

        li.addEventListener('click', function () {
            var att;
            if (li.parentElement.id == "list-item-terrain") {
                mode = "terrain";
                document.getElementById('mode-actu').innerText = mode;
            } else {
                mode = "perso";
                document.getElementById('mode-actu').innerText = mode;
            }
            if (mode == "perso") {
                activeItemInList(li);
                att = li.classList;
                classSelected = att[0];
                console.log(classSelected);
            } else if (mode == "terrain") {
                activeItemInList(li);
                att = li.classList;
                terrainSelected = att[0];
                console.log(terrainSelected);
            } else {
                console.log("Mode Introuvable");
            }
        });
    });
});

console.log("load");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function replace() {
    var torigin = document.getElementsByClassName('origintr');
    if (torigin.length > 0) {
        var width = torigin[0].clientWidth;
        var heigth = torigin[0].clientHeight;
        var body = document.getElementById('plateau');
        var tbody = body.getElementsByTagName('tbody')[0];
        tbody.style.backgroundPosition = width + 'px ' + heigth + 'px';
        tbody.style.backgroundSize = tbody.scrollWidth + 'px ' + tbody.scrollHeight + 'px';
    }
}

function rescaleWithZoom() {
    var zoom = document.getElementById('zoom-value').value;
    var caseSize = document.getElementById('case-size').value;
    var casesList = Array.from(document.getElementsByClassName('case'));
    var tbody = document.getElementById('app').getElementsByTagName('tbody')[0];
    var baseWidth = caseSize || casesList[0].offsetWidth;
    var baseHeight = caseSize || casesList[0].offsetHeight;
    casesList.forEach(function (cases) {
        cases.style.height = baseHeight * zoom + "px";
        cases.style.minWidth = baseWidth * zoom + "px";
    });
}

function changeBG() {
    var strMap = document.getElementsByTagName('select')[0].value;
    var tbody = document.getElementById('app').getElementsByTagName('tbody')[0];
    tbody.style.background = "url(/images/maps/" + strMap + ".jpg) no-repeat";
}

function loadMap() {
    changeBG();
    rescaleWithZoom();
    replace();
}

exports.loadMap = loadMap;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classToClickToActivate = "reverse-card"; //String of className to active the reverse action

function turnCard(front, back, backActive) {

  if (!backActive) {
    front.style.transform = 'rotateY(180deg)';
    back.style.transform = 'rotateY(0deg)';
    back.classList.toggle("back-active");
  } else {
    front.style.transform = 'rotateY(0deg)';
    back.style.transform = 'rotateY(-180deg)';
    back.classList.toggle("back-active");
  }
}

var cards = Array.from(document.getElementsByClassName(classToClickToActivate));

cards.forEach(function (e) {
  e.addEventListener("click", function (click) {
    var backActive = e.children[1].classList.contains("back-active");
    turnCard(e.children[0], e.children[1], backActive);
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function test() {
    console.log("TEESSST");
}

exports.default = test;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

var _bling = __webpack_require__(0);

var _test = __webpack_require__(4);

var _test2 = _interopRequireDefault(_test);

var _plateauJdr = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(1);

__webpack_require__(3);

__webpack_require__(13);

//IF plateau-jdr is generated
if ((0, _bling.$)('#app.plateau-jdr')) {
    (0, _plateauJdr.loadMap)();
}
//if we get a controlboard to gen a plateau-jdr
if ((0, _bling.$)('#plateau-jdr-control-gen')) {
    (0, _bling.$)('.btn-hide-seek').addEventListener('click', function (e) {
        if (this.innerText === "Cacher" || this.innerText === "Hide") {
            this.innerText = "Afficher";
            (0, _bling.$)('#plateau-jdr-control-gen').classList.add("hidden");
        } else {
            this.innerText = "Cacher";
            (0, _bling.$)('#plateau-jdr-control-gen').classList.remove("hidden");
        }
    });
}

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//CHeck if document is ready to be use
if (document.getElementById('multi-form-add-nav') != undefined) {
    console.log('horror-add.js loaded');
    var first = document.getElementById('first-form-add');
    var sec = document.getElementById('sec-form-add');
    var third = document.getElementById('third-form-add');

    var mini = document.getElementById('mini-form-add');
    var encounter = document.getElementById('encounter-form-add');
    var mythe = document.getElementById('mythe-form-add');

    first.addEventListener('click', function () {
        mini.style.display = 'block';
        encounter.style.display = 'none';
        mythe.style.display = 'none';
    });

    sec.addEventListener('click', function () {
        mini.style.display = 'none';
        encounter.style.display = 'block';
        mythe.style.display = 'none';
    });

    third.addEventListener('click', function () {
        mini.style.display = 'none';
        encounter.style.display = 'none';
        mythe.style.display = 'block';
    });
}

/***/ })
/******/ ]);
//# sourceMappingURL=App.bundle.js.map