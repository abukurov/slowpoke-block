import vkMessageTransform from './vk-message-node';
import newVkMessageTransform from './new-vk-message-node';

export default function (isNewVk) {
  return isNewVk ? newVkMessageTransform : vkMessageTransform;
}
