import {clipboard} from 'electron';
import {Message} from 'element-ui';

export const copyToClipboard = (text) => {
    clipboard.writeText(text);
    text.length <= 15 && Message({message: `已复制至剪贴板：${text}`, type: 'success'});
    text.length > 15 && Message({
        message: `已复制 ${text.length} 个字符至剪贴板`,
        type: 'success'
    });
};