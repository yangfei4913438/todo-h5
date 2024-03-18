import { Dialog, DialogProps, Input, TextArea } from '@nutui/nutui-react-taro';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Label, View } from '@tarojs/components';
import { v4 as uuidv4 } from 'uuid';

interface IProps extends PropsWithChildren {
  disabled?: boolean;
  add?: (item: ITodo) => void;
  defaultName?: string;
  defaultDesc?: string;
}

const CustomDialog: FC<IProps & DialogProps> = ({
  disabled = false,
  defaultName = '',
  defaultDesc = '',
  visible,
  children,
  onCancel,
  onConfirm,
  add = () => {},
  ...rest
}) => {
  const [name, setName] = useState(defaultName);
  const [desc, setDesc] = useState(defaultDesc);

  useEffect(() => {
    if (defaultName) {
      setName(defaultName);
    }
    if (defaultDesc) {
      setDesc(defaultDesc);
    }
  }, [defaultName, defaultDesc]);

  const handleCancel = () => {
    onCancel?.();
  };

  const handleAdd = () => {
    add({
      id: uuidv4(),
      label: name.trim(),
      desc: desc.trim(),
      active: true,
    });
    onConfirm?.();
  };

  return (
    <Dialog
      visible={visible}
      {...rest}
      cancelText='取消'
      onCancel={handleCancel}
      onConfirm={handleAdd}
      hideCancelButton={disabled}
      hideConfirmButton={disabled}
    >
      <View className='dialog-item-wrapper'>
        <Label className='dialog-item-label' for='dialog-title'>
          名称
        </Label>
        <Input
          className={`nut-input ${disabled && 'view'}`}
          placeholder='请输入名称'
          type='text'
          id='dialog-title'
          disabled={disabled}
          value={name}
          onChange={setName}
        />
      </View>

      <View className='dialog-item-wrapper'>
        <Label className='dialog-item-label' for='dialog-desc'>
          详细
        </Label>
        <TextArea
          className={`nut-textarea ${disabled && 'view'}`}
          placeholder='请输入详细内容'
          maxLength={100}
          id='dialog-desc'
          disabled={disabled}
          value={desc}
          onChange={setDesc}
        />
      </View>
    </Dialog>
  );
};

export default CustomDialog;
