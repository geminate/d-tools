import {clipboard} from 'electron';
import {Message} from 'element-ui';
import Setting from './setting';

/**
 * copy text to clipboard
 * @param text
 */
export const copyToClipboard = (text, that) => {
    clipboard.writeText(text);
    text.length <= 15 && Message({message: `${that.$t('alreadyCopy')} ${text}`, type: 'success'});
    text.length > 15 && Message({
        message: `已复制 ${text.length} 个字符至剪贴板`,
        type: 'success'
    });
};

/**
 * user setting
 * @type {Setting}
 */
export const setting = new Setting();