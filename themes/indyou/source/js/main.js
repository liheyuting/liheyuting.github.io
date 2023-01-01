// 图片查看器
import Viewer from './viewer';
// 边缘
import Primary from './primary';

import { addLoadEvent } from './util';

import Api from './api';

require('default-passive-events');

addLoadEvent(function () {
    Viewer.init();
    Api.init();
    Primary.init(window, document);
});
