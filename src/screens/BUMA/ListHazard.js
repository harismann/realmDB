import React from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import {connect} from 'react-redux';

import config from '../../config';
import endpoint from '../../config/endpoint';
import * as screenName from '../../router/screenNames';
import styles from './styles/ListHazardStyle';
import EnhancedHazardItem from './observable/ListHazard/EnhancedHazardItem';

import {increment} from '../../store/actions/defaultAction';

const ListHazard = ({database, navigation, route, listHazard, increment, regular}) => {
  const [isFetching, setIsFetching] = React.useState(false);

  const goToDetail = (detail, navigation) => {
    navigation.navigate(screenName.HAZARD_DETAIL_SCREEN, {
      detail: detail.item,
    });
  };

  const fetchListHazardAPI = async () => {
    const result = await fetch(config.api + endpoint.getAllData)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === 200) {
          return data.data;
        } else {
          return [];
        }
      })
      .catch(e => {
        console.warn(e);
        return [];
      });

    setIsFetching(false);
    return result;
  };

  const refresh = async database => {
    setIsFetching(true);
    setIsFetching(false);
    return null;
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={config.color.common.darkRed}
      />
      <View style={styles.mainContainer}>
        <FlatList
          data={listHazard}
          renderItem={item => (
            <EnhancedHazardItem
              database={database}
              hazards={item.item}
              onPress={() => goToDetail(item, navigation)}
            />
          )}
          keyExtractor={item => item.id}
          onRefresh={() => refresh(database)}
          refreshing={isFetching}
        />
      </View>
    </>
  );
};

const mapStateToProps = ({regular}) => ({
  regular,
});

const mapDispatchToProps = dispatch => ({
  increment: i => dispatch(increment(i)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListHazard);
