import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

type StarRatingProps = {
  value: number; 
  onChange?: (value: number) => void;  
  size?: number;
  readonly?: boolean; 
};

export default function StarRating({ value, onChange, size = 30, readonly = false }: StarRatingProps){
  const renderStar = (index: number) => {
    const isFilled = index < value;

    return (
      <MaterialIcons
        key={index}
        name={isFilled ? 'star' : 'star-outline'}
        color={isFilled ? "#fcd303" : '#5c5c5c'}
        size={size}
        onPress={() => !readonly && onChange && onChange(index + 1)}
      />
    );
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      {[0, 1, 2, 3, 4].map(renderStar)}
    </View>
  );
};
