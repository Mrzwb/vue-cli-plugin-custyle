<%_ if (type === 'pxtorem') { _%>
module.exports = {
    plugins: {
        'autoprefixer': {},
        'postcss-pxtorem': {
            rootValue: 16,        // 设计稿375为标准
            unitPrecision: 5,     // 保留rem精度
            propList: ['*'],
            selectorBlackList: [  // 忽略转换,可以正则
                ".ig-"
            ],
            minPixelValue: 1,
            replace: true,        // 是否转换后直接更换属性值
            mediaQuery: false,    // 是否在媒体查询也进行转换
            exclude: /node_modules/i
        }
    },
};

<%_ } else { _%>
module.exports = {
    plugins: {
        autoprefixer: {}, 
        "postcss-px-to-viewport": {
            unitToConvert: "px",             // 要转化的单位
            viewportWidth: 375,              // 设计稿的375, 使用蓝湖
            unitPrecision: 5,                // 转换后的精度，即小数点位数
            propList: ["*"],                 // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: "vw",              // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: "vw",          // 指定字体需要转换成的视窗单位，默认vw
            selectorBlaskList: [             // 指定不需要转换的类
                ".ig-"
            ],    
            minPixelValue: 1,                // 默认值1，小于或等于1px则不进行转换
            mediaQuery: false,               // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true,                   // 是否转换后直接更换属性值
            exclude: [/node_modules/],       // 设置忽略文件，用正则做目录名匹配
            landscape: false                 // 是否处理横屏情况
        }
    }
};

<%_ } _%>

