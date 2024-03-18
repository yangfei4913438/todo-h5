import { Text, View } from '@tarojs/components';
import { Checkbox } from '@nutui/nutui-react-taro';
import { FC, useMemo, useState } from 'react';
import CustomDialog from '../../pages/index/CustomDialog';

interface IProps {
  list: ITodo[];
  changActive: (idx: number) => void;
  allDone: () => void;
  clearDone: () => void;
}

const List: FC<IProps> = ({ list, changActive, allDone, clearDone }) => {
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState<ITodo>();

  const actives = useMemo(() => {
    return list.filter((item) => item.active).length;
  }, [list]);

  const handleView = (o: ITodo) => {
    setObj(o);
    setVisible(true);
  };

  return (
    <View className='list-content'>
      {list.map((item, idx) => {
        return (
          <View className={`list-item ${!item.active && 'inactive'}`} key={item.id}>
            <View
              onClick={(event) => {
                event.stopPropagation();
                console.log('222222:', idx);
                changActive(idx);
              }}
            >
              <Checkbox
                className='list-item-checkbox'
                value={item.id}
                checked={!item.active}
                label={item.label}
              />
            </View>
            <View
              className='list-item-icon'
              onClick={(event) => {
                event.stopPropagation();
                handleView(item);
              }}
            >
              查看
            </View>
          </View>
        );
      })}
      <View className='list-item list-item-end'>
        <Text>{actives} 个项目未完成</Text>
        <Text className='list-item-end-click' onClick={allDone}>
          完成所有项目
        </Text>
        <Text className='list-item-end-click' onClick={clearDone}>
          删除已完成的项目
        </Text>
      </View>

      <CustomDialog
        title='待办详情'
        visible={visible}
        disabled
        defaultName={obj?.label}
        defaultDesc={obj?.desc}
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
};

export default List;
