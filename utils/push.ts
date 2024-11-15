import { PushAPI } from '@pushprotocol/restapi';
import { ethers } from 'ethers';

export const PUSH_ENV = process.env.NEXT_PUBLIC_PUSH_ENV || 'staging';

export async function initializePushUser(signer: ethers.Signer) {
  const user = await PushAPI.initialize(signer, { env: PUSH_ENV });
  return user;
}

export async function createExperimentChat(
  pushUser: PushAPI,
  experimentId: string,
  experimentName: string
) {
  try {
    const groupChat = await pushUser.chat.group.create(experimentName, {
      description: `Discussion group for ${experimentName}`,
      image: 'https://your-default-image.png',
      members: [],
      admins: [],
      private: false,
    });

    return groupChat;
  } catch (error) {
    console.error('Error creating experiment chat:', error);
    throw error;
  }
}

export async function joinExperimentChat(
  pushUser: PushAPI,
  chatId: string
) {
  try {
    await pushUser.chat.group.join(chatId);
  } catch (error) {
    console.error('Error joining experiment chat:', error);
    throw error;
  }
}

export async function sendChatMessage(
  pushUser: PushAPI,
  chatId: string,
  message: string
) {
  try {
    await pushUser.chat.group.sendMessage(chatId, {
      content: message,
      type: 'Text',
    });
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export async function verifyChatGroup(
  pushUser: PushAPI,
  chatId: string
): Promise<boolean> {
  try {
    const chat = await pushUser.chat.group.info(chatId);
    return !!chat;
  } catch (error) {
    console.error('Error verifying chat group:', error);
    return false;
  }
} 