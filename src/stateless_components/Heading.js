import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';
import * as headingStyles from '../styles/heading';

const Heading = ({
  prop,
}) => {
  const {
    heading,
    text
  } = headingStyles.styles;

  return(
    <View style={heading}>
      <Text style={text}>Todo</Text>
    </View>
  );
};

Heading.propTypes = {

};

export default Heading;
