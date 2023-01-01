function init() {
    function regSW() {
        if ('serviceWorker' in navigator) {
            // 注册
            navigator.serviceWorker
                .register('/sw.js', { scope: '/' })
                .then(function (registration) {
                    console.log('ServiceWorker 注册成功！作用域为: ', registration.scope);
                })
                .catch(function (err) {
                    console.log('ServiceWorker 注册失败: ', err);
                });
    
            // SW 消息处理
            navigator.serviceWorker.ready.then(function (reg) {
                if (!window.Notification || !window.MessageChannel) {
                    return;
                }
                console.log('reg: ', reg);
                // 建立一个消息管道，用于当前页面与 SW 之间的消息传递，也便于 SW 知道该消息的来源
                var channel = new window.MessageChannel();
    
                channel.port1.onmessage = function (e) {
                    console.log('get Message: ', e.data);
                    if (!e.data) {
                        return;
                    }
    
                    // 要求申请通知权限
                    if (e.data.type === 'applyNotify') {
                        window.Notification.requestPermission().then(function (grant) {
                            if (grant !== 'granted') {
                                console.log('申请通知权限被拒绝了！');
                                return;
                            }
    
                            reg.active.postMessage({ type: 'notify', info: e.data.info }, [channel.port2]);
                        });
                    }
                };
    
                reg.active.postMessage('hello', [channel.port2]);
            });
    
            // 掉线通知示例
            window.addEventListener('offline', function () {
                Notification.requestPermission().then(function (grant) {
                    if (grant !== 'granted') {
                        return;
                    }
    
                    var notification = new Notification("Hi，网络不给力哟", {
                        body: '您的网络貌似离线了，不过页面还可以继续打开~',
                        icon: '/uploads/logo.png'
                    });
    
                    notification.onclick = function () {
                        notification.close();
                    };
                });
            });
        }
    }
    
    regSW();
    
    //console photo
    console.log('                                                .:iirrri.                                                                                             \n                                          ..ruIDgQQQQQQBgb7                                                                                           \n                                       .J5MgRMQMQgRgMgMMQRQI2.                                                                                        \n                                    .ijZQQMRgMgMgMgggQRQgRMQQ2::.                                                                                     \n                                   igQQgMgMgMgMgggMgRRRgRZgRZhQME1i                                                                                   \n                                 r1gMMDMgRgggMDMgggMgRZPZRgDXSggXEP7.                                                                                 \n                        . . ... rgQggggDMgMgggMggDgDMMb1PRgU1UEb5jXZbJ.     .                                                                         \n                     .........:rdQggDgDMgMgMDMggDMggMdu1US1uj1IhIuj5bZhI5PKbdEPK2Y.                                                                   \n                  ......:.::::vPMggggggDgDMDggMgggMgg1JjuJuXKu1KbjU155SXERBQQRQQBQZ1.                                                                 \n               ......::::iiriiuQgggMgMgggMggZgDggQdIjJYujJIQD2KgduJU1UuUu2XEMQgRRMMQMIi                                                               \n            ......::::iirr77vr2ggDggggggMgMDgDMgDPULJYJY2Kd5hSXPEjuu1uUUIuUUhPhXEgQMQQg.                                                              \n           ....:::iii77v7LLsLY2gggZgZgEMgQRQMMbILLvssUSPbXuJ15YSPJJ211uU1U12Ju12uKDQgMMg.                                                             \n        . ....::iirrv7YLsLsLsvUPgZgDDdggdSPX5sJYss5ShSX21YJYjYSPXsujuj112JhP5u2UIUSKMgQRi                                                             \n         ...::irr77LvYYJYsvY7vY5ZDZgZggXsJYLvYs1JU1UujLYvsYsLUddJssKU1jUu1PgS1u21I12hMRB7                                                             \n      ....::iirrvvYYYLYvv77r7irrEDEgMEI7v7v7vvsvYvvvYvsLJLLvu5s777YbEIuJu1PEXJU1IuI2I5EQv                                                             \n       ..::iir7vvYYsLv77rrii:i::5MgZuL7v7v7vvvvL7vvYvYvLvY1PIvi::iiJJuYjJUPDI1uU121I122RY.                                                            \n      ..::ii77LLJYYvvrrii:::...:IMEL7r77v7vv77v7LvLvvvrvIbE2sii::::rii7vs1MEPPSJuu212uUPMI                                                            \n     ..::ii77vvsYYv7rri:::...r5ZDI777Yv7r77v777v777LY5SK2UsLLvii:irr:::rvPX215hb5KXIuI15gR:                                                           \n    ...::ir7vvJLYv7ri::... .hRMgh7v77v2uYLY7v7LLJs2SPKIs77vvY77r77r::::iYJJuJs2PZDdI1u2udR2.                                                          \n   ....::rrvvYYYvvri::... .EgZEdvr77rrrsY1u1151UujLY77777vvv7jXbU7iiirrrir7YLsYKbMh52U1U2dPL                                                          \n    ..::ii7vsYsvvrr::... iIMEEE17rrrrrrr7irrr77rir7r77v777vsUKPKX2j7ri::::r7YvJ2XXdKK21U2Udb.                                                         \n   ....:ir7vLsLv7ri:.... SQDdgX77rirrrirrrrrirrrr7rrirr7L1IbXsr7vL7rii:::ii77vLJs2EDKP5UjUXZv                                                         \n  . ..::rrvvsLY77ii::.. :PMdMMuirrrirrrrririirrirrvvJuS52YLiriririrr7iiiii77vvYvLYSPZdgKuj2Ubi                                                        \n   ..::ii77YYsvvri::... igZDgMsriririiiri7sYLJssL1I52UsLi::iiiirirrrr7rrr77vvvvvvYLjKddZU1u1ShL                                                       \n  ...::ir7vvsvv7ri:.... iggdRDYiririiir:ius:rr7riii:i:::::i:iiiiiirr7rrr777777L7vvYvsuUPZPK12ZZ.                                                      \n  ...::rrvvYLY77ri::..  :EgdgMLiiiriii7Lr1Yi::.::::::::::i:i:iiiirirrrr7r7r77vLuJjYJvYLhDgh1XPh.                                                      \n  ..::ir77sYsvvrr::....  jRZgg2rririr:rUdXZD5ii:::::::::::i:::iiiirirrrr7r7v5XPI51uYsvs5KXEXdPP.                                                      \n ..::ii77LYsvL7ri::...   .rPEghJii:iii:rUSsuJr::.:.::::::::::::iiiiiirr7rJUSjjvLvLvvLYLujUPDZMgv                                                      \n....iir7LLsLL77ii::..      uEdDh7:i:iir7uui...:.:...::::::::::i:iiiirirr7sv7777r77vvu25XX2PDQMgEv                                                     \n...::rrLvsLY77ri::...      ibEZM2i:i:::UPPv....:...:.::::::::::::iiiirirrrr7rr7u2PZgRQgDRQRQgd2SKs                                                    \n..::rrvvsLYvvrr::....       1PDgM7::i::YZSv.......:.:.:.::::::::::iiiirrrrrrYjPgQQQQBRMKbZBQdSS1dK.                                                   \n.::ir7vYLsvv7r::....        :jgRM2:::i:755:..:...........::i:::::i:iiii7rrvIgQQQQQMQQQQQ1URBZP1UPd.                                                   \n..ii77vLsvL77i::...           SZRKs:ii::rjv:........:..rjjJvvi::::i:iiri75QQQQQQQRQRQQQZI5QQgKU1PI.                                                   \n.::rrvvsYY77ii::..            .JERD7:::rrs2I7........rY2Lii::::::::::iiivQQQRQQQRQQQRQgbdRRMPKsh1.                                                    \n::ii77LLYvvrr::....             1QQX:::::r2hKv7.....vur:......irv7vri:iruRQMQQQQQQQQQQQQQgPuPggI.                                                     \n.::rrvvsLLv7ii:...              :EMD7i::::rvjr:...:rr:....:ir2hEDgDgXUsSSZRQRQQQQQQQQRDE5Ij1P2r.                                                      \n..ii77LvYLL7ri:....              :uDZ1i:i::.vI7.........7UbgQQQQQdKDQQD7rrj5ZDQMMdPXI11sss25P.                                                        \n.::ir7vsYYvvri::...                :vJ7:ii::iS1:.....:7IP5bQRQMRMg2JgQbr:irLSddDdKju7LvYsuSMs                                                         \n..::rrLLsYY77ii:...                   2s2r:.r5h:.....XQQ17PQQgQRQRgrZQg7771KdXISbZZP17vLujdh.                                                         \n..:iir7LLsLL77ii:...                  .sXhv:iKdv:...iMQRDQMQMRMRMDusMQDKXK5hdDbPXKSPEXuYXgv                                                           \n..::ii7vLLsLv7ri::...                   .iYYJ1ZgPKKIbQQRQRQMQgRRghKZQgPIKKS5S5hXPPPPdbddDX.                                                           \n ..::ir7vYYYvvrri:....                     :Jj5MRQb25gQQRQMQgRRQQQRZDEUUhduI217rrLUKMMZRMgv                                                           \n ...::rr7vsLsvvrri:....                    .vvirsuYiirIPQMQRQMMZP1J7PP5bZvr77r77vsKh27rii:.                                                           \n  ...::rrvvYLYvvrri::...                    :Xv...ivv7.iJPXPhSYLri:iSPURhi:ir7vjjXh5:..                                                               \n  ....::irv7YLsvL7rii:... .                   :vsvvrv5S2v:::::::i::iKPdh17sYsLYvJLS2...                                                               \n   ....::irvvYYsLL7rii::....                   .irrrii:rujsLv7rrirrYdMZSUKX5Lvvv7sKhi:.:                                                              \n    ....::rr7vYLYvL77ii::...                             .::ivJYsLY2IJsXSSZZh1s77vbgEPEDKJ2u1sj7vYY.                                                  \n     ....::ir7vYvJLLvsYsv7rrii..                             .rvjuJIu12MEhbddE5s7jIbPPPgbPPdPDEgDggK27                                                \n      ....::ir77vLsLJhYrJU5sYY1J.                        .ij1YJJJYssjsjZgXhPKXhujsYjKbdEbII25IShPXXKPgJ                                               \n       ....::iir7LvYsurYb27Ls77U57i.                   i1JssYYvLvYvJYsvXdbXPKhbPJ77J2PZgPKISI55KSSSX5PDZ:                                             \n        ....:::ir7vvJuSdQILuPXvjdSJi..              .vYjuvvvY7vvYLYLJYYJKDPKdbDPuiiivuPZPI5II5XSKSXXKSEgS                                             \n         ....:::irrvvYIhDZKPgQ52hYis1UL:..       .jhIsvv7LvLvYLYLsLYLsYLJZDgEZX2s7:i:i7jUIUI2X5X5K5K5XKgP                                             \n        . ....:::iir77vLuISIPPdPji::i7svL7ri:.rvujuYY7vvvLLvYvLvYLYYJLJYJ1SIIU2uUvr:::i7j252IISISShXKSKPZY.                                           \n   ............::::ir77v7vvYvLUdS7i:.::i.:75PXbI7v7vvYvLvv7LvYvYLsLJLYs1JJYjs1u1u1vi:i:i71ISIS5S5XSKXKKPED2.                                          \n. ............::::::iirrvvYLsLYvu22j7:rii::.rY75XsvrvLLvLLYvs7LvLLsLsLJsjsjsjjuJuu17i:iii7U2SISIXIX5KSPPgP:                                           \n.....:.::::::::::::iiiirr77LLsLsvYLX5j7riii::LivPKv7vvvv7LvvvYJuYYLYYJLsLjYusuJuJ11uri:i:i7UIS2SSKXPddKPbEJ                                           \n....::::i:iii:i:i:i:iiiirr77LvYLsvsL2U1uJrirrii:i2hrvLvvv7YJu2PPhJJLjssYJYjYusuJ1uU1jri:iirLIISIS5SPQgP5XEB7                                          \n.::::iirirrrrrrririiiiirirr77vvYLsLL777uJ1Jsv77JvsISYvvLLu1XIPdgESJYLsYjYJYjsuJ1j1u1uJri:ii7J5IS5SIPgMPX5hdb.                                         \n::iiirrr777777777r7rrrrrrr77v7LvYLYvY7vrirU5UY1v: :D57svKhPhP1uSRh2vsYssjYjYjJjjuj1u11jriiirY2IISIXSPZdXKS5dI.                                        \n.::rr77v7v7L7L7v7v7777r7777vvvvYYsvYvv7rii::.... . .75Kb17:... .hZSJvsLYLJYJsjJuj1uuu1uYii:r722S255S2DEbXXShRU                                        \n::iir777LvLLYvYvYvYvL7vvv7LvYvsLsLYvv77ir:::.....    7Xv        ugdJLvYvLLJsjsjJujuj1uUuYiiiv15I5I555PMbPSXXPZ:                                       \n::irr77vvLvYvsLsLYLsvYLYLsvYvsYYLYvv77ii:::.....                :ZdUvssJYJYjYjsjsujuJUj2uYrvL2252I5S2hDgdhSXIZr                                       \n::iirr77vvYvYYsLsYJLsYJLsLsYsLYLYvv77ii::::.... .                hZ2LvsYjYJsJYjsuJujuj1uU1uYU252525IX2ZMZPdPgE.                                       \n.::iirr77vvLvYLsYJLsLsLsLsLsvLvL777rir::::......                 SPXsYvYvsYsYJYuJuj1Juj1uU12UIU52SIIU5hQZddd2dr                                       \n..::iirr77v7YvYvsLsLsYsvYvYvYvL7vr7irii::::.... .                5b5uLYvsYsLJYJsusuJ1J1uUu2U21I2I2525IKbgII25IP1i                                     \n...::::iirrv7vvYLsLsYsLsLYvLvv7v77rrii:i::.......                XPSJJvYLsLJYssJYjJuj1JujUu2UIUIUII55S5SZhu22UIgD7                                    \n......::iirr77vvvLsLYLsLsvYvLvv777rrrii:i::::.... .              5dSuYYLsLsLsLJYJsjs1J1jUu2uUU2UIU5ISI5UEh1UUUI1XZZ:                                  \n   ....::::iirr77v7LvsLYLYLsvYvv7v77rrrrii:i::...... .           SPKJsvsLsLsYsYJsJsuJuj1j11U121IU525I5ISKZ521UuUuIh1.                                 \n     .....::::iirr77vvLLsLsLsLYLYLLvv7v77rrii::::.... .          hZ5ULLLsvsvJYJsjsJJuJuj1jU1212UI252S2SIXZMXUsJYjJj1s                                 \n       ......::::iirr77v7LvsvsLsLsYsLYLLvL77rrii::......         PPSjsvJLsLYYJLJYJsusuJuu1u11U1IU5252555SZDJIP5jsuuUY                                 \n          ......::::iirr7r77vvLvYvYvYYsLYvsvL77ri::.... .       .hd5uYYLYvYLsYJssYJsuj1JuuUuUuU1I2I252S5XbM. rhhKj1Us                                 \n             ......::::iiiirrrr7r77v7vvYvYYsLY77ri::....        iZh5JsLYLsLYLsYJsjYjJuJuj1jUuU1I252IISIS2dQ.   7Ub2Y.                                 \n                ........::::i:iiiirr7r77vvYYsvY77ri::....       rbP2jvYLYLsYsYJYjYjJjs1J1jU1U12UIUI252SISPQ:     ::                                   \n                   . ........:.::::::irrrvvsLYvL77ii::..        :bPSJuUsvsvYLsLJYjsusjs1J1jUu2122I222IISIXPP                                          \n                        . ..........::iirr7vYLJvvrri:....       LPh5ssSXK552UJjYJYJYJsuJ1J1j1uUu22S5PKhXXXg1                                          \n                                 ....:::irrvvYLs77rr::...       jP2UvLLYJhPbdEPhSIU51U122I1Uu11IIKPDEdX5Idg7                                          \n                                    ...::ir7vLsLY77ii:...       jPSjJssLsLYvjsI5hXhXKISI5U5IXPdPZEPS5XEEghhdX:                                        \n                                     ..::ii77LLsvvrr::....      LZKjLsvsYJYjj1uI255KXhKPPdbZEDdEPdPEEEPPXSIbB7                                        \n                                    . ..::rrvvYvL77ii:...       sZbXh2JssLuj5SPPbPdbEEDZgZgDDEZddKhSSI5I5SXPX:                                        \n                                     ...:ii7vLLYvvrr::.. .      ub552XXK5SUI1Uu22SI5IX5KXhSX5SShhPhdbZdZEDDP..                                        \n                                    . ..::rrvLsLL77ii:...       Xd5sLv1jUISIS5XSSIXIXShKPKbPEdgDRgRDDZMgRgQh.                                         \n                                     ...:ii7vYLsvvrr::..        rEdbXKXSIX5XSKhPPEEDdDZDEDZDZgEZEZEgZDZgDDbgL.                                        \n                                      ..::ir77Yvvrr::..          UZDgEDDgdDEDEDZDZDEEbEbZdddZEEEDEDZDDDZDEgbS.                                        ');
    
    //subtile diy
    function diySubtile() {
        window.fetch('https://api.ninesix.cc/yiyan', {
            method: 'get',
        })
            .then((res) => {
                return res.json();
            })
            .then((data, status) => {
                if (document.querySelector('.yan')) {
                    document.querySelector('.yan').setAttribute('title', data.data.from + "|" + data.data.creator);
                    document.querySelector('.yan').innerHTML = '『' + data.data.content + '』';   
                }
            });
        window.fetch('https://api.ninesix.cc/yiyan', {
            method: 'get',
        })
            .then((res) => {
                return res.json();
            })
            .then((data, status) => {
                if (document.querySelector('.yans')) {
                    document.querySelector('.yans').setAttribute('title', data.data.from + "|" + data.data.creator);
                    document.querySelector('.yans').innerHTML = '『' + data.data.content + '』';   
                }
            });
    }
    diySubtile();
}


module.exports = {
	init: init
}