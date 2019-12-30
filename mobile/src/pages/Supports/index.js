import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, AddButton, List } from './styles';

import Support from '~/components/Support';

export default function Supports(props) {
  const [support, setSupport] = useState([]);
  const [pagination, setPagination] = useState({});

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);

  const studentId = useSelector(state => state.auth.studentId);

  const getData = async (nextPage = 1) => {
    try {
      const response = await api.get(`/students/${studentId}/help-orders`, {
        params: { page: nextPage },
      });

      const { rows, ..._pagination } = response.data;

      setSupport(nextPage >= 2 ? [...support, ...rows] : rows);
      setPagination(_pagination);

      setLoading(false);
      setRefresh(false);
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível baixar os pedidos de auxílio'
      );
      setLoading(false);
      setRefresh(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    if (page < pagination.totalPages) {
      const nextPage = page + 1;

      setPage(nextPage);
      getData(nextPage);
    }
  };

  const refreshList = () => {
    setRefresh(true);
    setPage(1);
    setSupport([]);

    getData();
  };

  const handleNavigate = () => {
    const { navigation } = props;

    navigation.navigate('NewSupport');
  };

  const handleOnPress = supportId => {
    const { navigation } = props;

    navigation.navigate('SupportAnswer', {
      supportId,
    });
  };

  return (
    <Container>
      <AddButton loading={loading} onPress={handleNavigate}>
        Novo pedido de auxílio
      </AddButton>

      <List
        data={support}
        onRefresh={refreshList}
        refreshing={refresh}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Support
            data={item}
            onPress={() => {
              handleOnPress(item.id);
            }}
          />
        )}
      />
    </Container>
  );
}

Supports.navigationOptions = {
  tabBarLabel: 'Pedir Ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
