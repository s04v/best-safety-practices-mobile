import React, { useEffect } from 'react';
import moment from 'moment';
import { Text, View } from 'react-native';
import { isUserAdmin } from '@/utils/utils';
import { Button } from '@ui-kitten/components';

type MessageItemProps = {
  date: string; 
  message: string;
  onDelete: () => void;
};

const MessageItem = ({ date, message, onDelete }: MessageItemProps) => {
  return (
    <View className="py-4 rounded-md border-b border-b-gray-200 flex-row justify-between shrink-0 ">
      <View className=""w-full>
        <Text className="text-gray-600 font-medium">{moment(date).local().format("YYYY-MM-DD HH:mm")}</Text>
        <Text className="text-gray-800">{message}</Text>
      </View>

      {isUserAdmin() && <Button status='danger' size='small' onPress={onDelete} style={{ height: 'auto' }}>Delete</Button>}
    </View>
  );
};

export default MessageItem;


