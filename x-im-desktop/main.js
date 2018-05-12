
import fs from 'fs';
import tmp from 'tmp';
import { app, powerMonitor, BrowserWindow, Tray, Menu, ipcMain, clipboard, shell, nativeImage, dialog } from 'electron';
import windowStateKeeper from 'electron-window-state';
import AutoLaunch from 'auto-launch';
import { autoUpdater } from 'electron-updater';
import axios from 'axios';

import pkg from './package.json';

let forceQuit = false;
let downloading = false;
let mainWindow;
let tray;
let settings = {};
let isFullScreen = false;
let isWin = process.platform === 'win32';
let isOsx = process.platform === 'darwin';
let isSuspend = false;
let userData = app.getPath('userData');
let imagesCacheDir = `${userData}/images`;
let voicesCacheDir = `${userData}/voices`;
//  主菜单
let mainMenu = [
    {
        label: pkg.name,
        submenu: [
            {
                label: `关于 ${pkg.name}`,
                selector: 'orderFrontStandardAboutPanel:',
            },
            {
                label: '预设...',
                accelerator: 'Cmd+,',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('show-settings');
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                label: '更新',
                accelerator: 'Cmd+U',
                click() {
                    checkForUpdates();
                }
            },
            {
                type: 'separator'
            },
            {
                label: '退出',
                accelerator: 'Command+Q',
                selector: 'terminate:',
                click() {
                    forceQuit = true;
                    mainWindow = null;
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'File',
        submenu: [
            {
                label: '新增聊天',
                accelerator: 'Cmd+N',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('show-newchat');
                }
            },
            {
                label: '搜索...',
                accelerator: 'Cmd+F',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('show-search');
                }
            },
            {
                label: '群发消息',
                accelerator: 'Cmd+B',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('show-batchsend');
                }
            },
            {
                type: 'separator',
            },
            {
                label: '插入表情',
                accelerator: 'Cmd+I',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('show-emoji');
                }
            },
            {
                type: 'separator',
            },
            {
                label: '下一个对话',
                accelerator: 'Cmd+J',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('show-next');
                }
            },
            {
                label: '之前的对话',
                accelerator: 'Cmd+K',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('show-previous');
                }
            },
        ]
    },
    {
        label: '对话',
        submenu: [
            {
                label: 'Loading...',
            }
        ],
    },
    {
        label: '联系人',
        submenu: [
            {
                label: 'Loading...',
            }
        ],
    },
    {

    },
    {
        label: '编辑',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }
        ]
    },
    {
        label: '视图',
        submenu: [
            {
                label: isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen',
                accelerator: 'Shift+Cmd+F',
                click() {
                    isFullScreen = !isFullScreen;

                    mainWindow.show();
                    mainWindow.setFullScreen(isFullScreen);
                }
            },
            {
                label: 'Toggle Conversations',
                accelerator: 'Shift+Cmd+M',
                click() {
                    mainWindow.show();
                    mainWindow.webContents.send('show-conversations');
                }
            },
            {
                type: 'separator',
            },
            {
                label: ''
            },
            {
                type: 'separator',
            },
            {
                role: 'toggledevtools'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },
    {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'close'
            }
        ]
    },
    {
        role: '帮助',
        submenu: [
            {
                label: '反馈',
                click() {
                    shell.openExternal('https://github.com/dongyanghe/eikesi/issues');
                }
            },
            {
                label: '访问我们',
                click() {
                    shell.openExternal('https://github.com/dongyanghe/eikesi');
                }
            },
            {
                type: 'separator'
            },
            // {
            //     label: '访问 Twitter',
            //     click() {
            //         shell.openExternal('https://twitter.com/var_darling');
            //     }
            // }
        ]
    }
];
//  小图标菜单
let trayMenu = [
    {
        label: `您有0条消息`,
        click() {
            mainWindow.show();
            mainWindow.webContents.send('show-messages');
        }
    },
    {
        label: '显示界面',
        click() {
            let isVisible = mainWindow.isVisible();
            isVisible ? mainWindow.hide() : mainWindow.show();
        }
    },
    {
        type: 'separator'
    },
    {
        label: '预设...',
        accelerator: 'Cmd+,',
        click() {
            mainWindow.show();
            mainWindow.webContents.send('show-settings');
        }
    },
    {
        label: '联系我们',
        click() {
            shell.openExternal('https://github.com/dognyanghe/eikesi');
        }
    },
    {
        type: 'separator'
    },
    {
        label: '显示开发工具',
        accelerator: 'Alt+Command+I',
        click() {
            mainWindow.show();
            mainWindow.toggleDevTools();
        }
    },
    {
        label: '隐藏菜单图标',
        click() {
            mainWindow.webContents.send('hide-tray');
        }
    },
    {
        type: 'separator'
    },
    {
        label: '单击更新',
        accelerator: 'Cmd+U',
        click() {
            checkForUpdates();
        }
    },
    {
        label: '退出',
        accelerator: 'Command+Q',
        selector: 'terminate:',
        click() {
            forceQuit = true;
            mainWindow = null;
            app.quit();
        }
    }
];
let avatarPath = tmp.dirSync();
let avatarCache = {};
let avatarPlaceholder = `${__dirname}/src/assets/images/user-fallback.png`;
const icon = `${__dirname}/src/assets/images/dock.png`;

async function getIcon(cookies, userid, src) {
    var cached = avatarCache[userid];
    var icon;

    if (cached) {
        return cached;
    }

    if (cookies && src) {
        try {
            let response = await axios({
                url: src,
                method: 'get',
                responseType: 'arraybuffer',
                headers: {
                    Cookie: cookies,
                    Host: 'wx.qq.com',
                    Referer: 'https://wx.qq.com/',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8',
                },
            });
            // eslint-disable-next-line
            let base64 = new Buffer(response.data, 'binary').toString('base64');

            icon = `${avatarPath.name}/${userid}.jpg`;
            fs.writeFileSync(icon, base64.replace(/^data:image\/png;base64,/, ''), 'base64');
        } catch (ex) {
            console.error(ex);
            icon = avatarPlaceholder;
        }
    }

    var image = nativeImage.createFromPath(icon);

    image = image.resize({ width: 24, height: 24 });

    avatarCache[userid] = image;

    return image;
}

function checkForUpdates() {
    if (downloading) {
        dialog.showMessageBox({
            type: 'info',
            buttons: ['OK'],
            title: pkg.name,
            message: `Downloading...`,
            detail: `Please leave the app open, the new version is downloading. You'll receive a new dialog when downloading is finished.`
        });

        return;
    }

    autoUpdater.checkForUpdates();
}

function updateTray(unread = 0) {
    if (!isOsx) {
        // Always show the tray icon on windows
        settings.showOnTray = true;
    }

    // Update unread mesage count
    trayMenu[0].label = `You have ${unread} messages`;

    if (settings.showOnTray) {
        if (tray
            && updateTray.lastUnread === unread) {
            return;
        }

        let contextmenu = Menu.buildFromTemplate(trayMenu);
        let icon = unread
            ? `${__dirname}/src/assets/images/icon-new-message.png`
            : `${__dirname}/src/assets/images/icon.png`
            ;

        // Make sure the last tray has been destroyed
        setTimeout(() => {
            if (!tray) {
                // Init tray icon
                tray = new Tray(icon);

                tray.on('right-click', () => {
                    tray.popUpContextMenu();
                });

                let clicked = false;
                tray.on('click', () => {
                    if (clicked) {
                        mainWindow.show();
                        clicked = false;
                    } else {
                        clicked = true;
                        setTimeout(() => {
                            clicked = false;
                        }, 400);
                    }
                });
            }

            tray.setImage(icon);
            tray.setContextMenu(contextmenu);
        });
    } else {
        tray.destroy();
        tray = null;
    }

    // Avoid tray icon been recreate
    updateTray.lastUnread = unread;
}

async function autostart() {
    var launcher = new AutoLaunch({
        name: 'weweChat',
        path: '/Applications/wewechat.app',
    });

    if (settings.startup) {
        if (!isOsx) {
            mainWindow.webContents.send('show-errors', {
                message: 'Currently only supports the OSX.'
            });
            return;
        }

        launcher.enable()
            .catch(ex => {
                console.error(ex);
            });
    } else {
        launcher.disable();
    }
}

function createMenu() {
    var menu = Menu.buildFromTemplate(mainMenu);

    if (isOsx) {
        Menu.setApplicationMenu(menu);
    } else {
        mainWindow.setMenu(null);
    }
}

/**
 * 创建主窗口
 * @call: app.ready事件触发
 * @notice: 开发者工具在小图标菜单可打开
 */
const createMainWindow = () => {
    //  主窗口默认配置
    var mainWindowState = windowStateKeeper({
        defaultWidth: 1200,
        defaultHeight: 742,
    });

    mainWindow = new BrowserWindow({
        // title: 'x-im',
        x: mainWindowState.x,
        y: mainWindowState.y,
        minWidth: 1200,
        minHeight: 742,
        vibrancy: 'medium-light',   //  String (可选) - 窗口是否使用 vibrancy 动态效果, 仅 macOS 中有效.
        transparent: true,  //  Boolean (可选) - 使窗口 透明. 默认值为 false.
        // maximizable: true,  //  Boolean (可选) - 窗口是否可以最大化动. 在 Linux 中无效. 默认值为 true.
        // fullscreen: false,   //  Boolean (可选) - 窗口是否可以全屏. 当设置为 false 时，在 macOS 上全屏的按钮将被隐藏或禁用. 默认值为 false.
        // closable: true, //  Boolean (可选) - 窗口是否可以关闭. 在 Linux 中无效. 默认值为 true.
        titleBarStyle: 'hidden-inset',  //  String (可选) - 窗口标题栏的样式. 默认值为 default. 可能的值有：
        backgroundColor: 'none',    //   String (可选) - 窗口的16进制背景颜色, 例如 #66CD00 或 #FFF 或 #80FFFFFF (支持alpha透明度). 默认值为#FFF (白色).
        resizable: false,   //  Boolean (可选) - 窗口是否可以改变尺寸. 默认值为true.
        webPreferences: {
            // devTools: true, //  Boolean (可选) - 是否开启 DevTools. 如果设置为 false, 则无法使用
            scrollBounce: true  //  Boolean (可选) - 在 macOS 启用弹力动画 (橡皮筋) 效果. 默认值为 false.
        },
        frame: !isWin,  //   Boolean (可选) - 设置为 false 时可以创建一个Frameless Window. 默认值为 true.
        icon
    });
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    mainWindow.setSize(350, 460);
    mainWindow.loadURL(
        `file://${__dirname}/src/index.html`
    );
    mainWindow.webContents.on('did-finish-load', () => {
        try {
            mainWindow.show();
            mainWindow.focus();
        } catch (ex) { }
    });

    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });

    mainWindow.on('close', e => {
        if (forceQuit) {
            mainWindow = null;
            app.quit();
        } else {
            e.preventDefault();
            mainWindow.hide();
        }
    });

    ipcMain.on('settings-apply', (event, args) => {
        settings = args.settings;
        mainWindow.setAlwaysOnTop(!!settings.alwaysOnTop);

        try {
            updateTray();
            autostart();
        } catch (ex) {
            console.error(ex);
        }
    });

    ipcMain.on('show-window', event => {
        if (!mainWindow.isVisible()) {
            mainWindow.show();
            mainWindow.focus();
        }
    });

    ipcMain.on('menu-update', async(event, args) => {
        var { cookies, contacts = [], conversations = [] } = args;
        var conversationsMenu = mainMenu.find(e => e.label === 'Conversations');
        var contactsMenu = mainMenu.find(e => e.label === 'Contacts');
        var shouldUpdate = false;

        if (!isOsx) {
            return;
        }

        if (conversations.length
            && conversations.map(e => e.name).join() !== conversationsMenu.submenu.map(e => e.label).join()) {
            shouldUpdate = true;

            conversations = await Promise.all(
                conversations.map(async(e, index) => {
                    let icon = await getIcon(cookies, e.id, e.avatar);

                    return {
                        label: e.name,
                        accelerator: `Cmd+${index}`,
                        icon,
                        click() {
                            mainWindow.show();
                            mainWindow.webContents.send('message-chatto', {
                                id: e.id,
                            });
                        }
                    };
                })
            );
            conversationsMenu.submenu = conversations;
        }

        if (contacts.length) {
            shouldUpdate = true;

            contacts = await Promise.all(
                contacts.map(async e => {
                    let icon = await getIcon(cookies, e.id, e.avatar);

                    return {
                        label: e.name,
                        icon,
                        click() {
                            mainWindow.show();
                            mainWindow.webContents.send('show-userinfo', {
                                id: e.id,
                            });
                        }
                    };
                })
            );
            contactsMenu.submenu = contacts;
        }

        if (shouldUpdate) {
            createMenu();
        }
    });

    ipcMain.on('message-unread', (event, args) => {
        var counter = args.counter;

        if (settings.showOnTray) {
            updateTray(counter);
        }
    });

    ipcMain.on('file-paste', (event) => {
        var image = clipboard.readImage();
        var args = { hasImage: false };

        if (!image.isEmpty()) {
            let filename = tmp.tmpNameSync() + '.png';

            args = {
                hasImage: true,
                filename,
                raw: image.toPNG(),
            };

            fs.writeFileSync(filename, image.toPNG());
        }

        event.returnValue = args;
    });

    ipcMain.on('file-download', async(event, args) => {
        var filename = args.filename;

        fs.writeFileSync(filename, args.raw.replace(/^data:image\/png;base64,/, ''), {
            encoding: 'base64',
            // Overwrite file
            flag: 'wx',
        });
        event.returnValue = filename;
    });

    ipcMain.on('open-file', async(event, filename) => {
        shell.openItem(filename);
    });

    ipcMain.on('open-folder', async(event, dir) => {
        shell.openItem(dir);
    });

    ipcMain.on('open-map', (event, args) => {
        event.preventDefault();
        shell.openExternal(args.map);
    });

    ipcMain.on('open-image', async(event, args) => {
        var filename = `${imagesCacheDir}/img_${args.dataset.id}`;

        fs.writeFileSync(filename, args.base64.replace(/^data:image\/png;base64,/, ''), 'base64');
        shell.openItem(filename);
    });

    ipcMain.on('is-suspend', (event, args) => {
        event.returnValue = isSuspend;
    });

    ipcMain.once('logined', event => {
        mainWindow.setResizable(true);
        mainWindow.setSize(mainWindowState.width, mainWindowState.height);
        mainWindowState.manage(mainWindow);
    });

    powerMonitor.on('resume', () => {
        isSuspend = false;
        mainWindow.webContents.send('os-resume');
    });

    powerMonitor.on('suspend', () => {
        isSuspend = true;
    });

    if (isOsx) {
        app.setAboutPanelOptions({
            applicationName: pkg.name,
            applicationVersion: pkg.version,
            copyright: 'Made with 💖 by trazyn. \n https://github.com/dongyanghe/eikesi',
            credits: `With the invaluable help of: \n web.wechat.com`,
            version: pkg.version
        });
    }

    [imagesCacheDir, voicesCacheDir].map(e => {
        if (!fs.existsSync(e)) {
            fs.mkdirSync(e);
        }
    });

    mainWindow.webContents.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8');
    createMenu();
};  // -end createMainWindow()

app.setName(pkg.name);
app.dock && app.dock.setIcon(icon);

app.on('ready', createMainWindow);
app.on('before-quit', () => {
    // Fix issues #14
    forceQuit = true;
});
app.on('activate', e => {
    if (!mainWindow.isVisible()) {
        mainWindow.show();
    }
});

autoUpdater.on('update-not-available', e => {
    dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        title: pkg.name,
        message: `${pkg.name} is up to date :)`,
        detail: `${pkg.name} ${pkg.version} is currently the newest version available, It looks like you're already rocking the latest version!`
    });

    console.log('Update not available.');
});

autoUpdater.on('update-available', e => {
    downloading = true;
    checkForUpdates();
});

autoUpdater.on('error', err => {
    dialog.showMessageBox({
        type: 'error',
        buttons: ['取消更新'],
        title: pkg.name,
        message: `未能更新 ${pkg.name} :(`,
        detail: `检索更新信息时发生错误，请稍后再试。`,
    });

    downloading = false;
    console.error(err);
});

autoUpdater.on('update-downloaded', info => {
    var { releaseNotes, releaseName } = info;
    var index = dialog.showMessageBox({
        type: 'info',
        buttons: ['重启', '稍后'],
        title: pkg.name,
        message: `新版本已被下载。请重新启动应用程序以应用更新。`,
        detail: `${releaseName}\n\n${releaseNotes}`
    });
    downloading = false;

    if (index === 1) {
        return;
    }

    autoUpdater.quitAndInstall();
    setTimeout(() => {
        mainWindow = null;
        app.quit();
    });
});
