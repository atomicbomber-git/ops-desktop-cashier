import { Menu } from 'electron'
import events from './events'

function menuTemplate(window) {
    return [
        {
            label: 'Akun Pengguna',
            submenu: [
                { label: 'Keluar', click: () => { window.webContents.send(events.LOG_OUT) } },
            ],
        },

        {
            label: 'Master Data',
            submenu: [
                { label: 'User', click: () => { window.webContents.send(events.PAGE_CHANGE, 'user-index') } },
            ],
        },
    
        {
            label: 'Operasional',
            submenu: [
                { label: 'Transaksi', click() { window.webContents.send(events.PAGE_CHANGE, 'transaction-index') }},
                { label: 'Histori Transaksi' },
            ],
        }
    ]
}

function menu(window) {
    return Menu.buildFromTemplate(menuTemplate(window)) 
}

export default menu