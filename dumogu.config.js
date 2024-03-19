/** 
 * 新松后台管理配置文件
 */

/** 是否是生产环境 */
const isProd = process.env.NODE_ENV === 'production';

/** 开发环境配置 */
let configDev = {
    name:'新松 - 后台管理',
    title:'新松机器人',
    baseApiURL:'https://s.dumogu.top/api',
    routeBasePath:'/',
    biuldBasePath:'/',
};

/** 生产环境配置 */
let configProd = {
    name:'新松 - 后台管理',
    title:'新松机器人',
    baseApiURL:'/api',
    routeBasePath:'/',
    biuldBasePath:'/',
};

let config = isProd ? configProd : configDev;

export default config;