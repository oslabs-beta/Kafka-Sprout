import React, { useState } from "react";
import PopupContainer from "../UIComponents/PopupContainer";
import { Button } from "../UIComponents/Buttons";
import { StyledLabeledInput } from "../UIComponents/LabeledInput";
import Loader from "react-loader-spinner";
import constants from "../UIComponents/constants";

interface ConfigModel {
  // topic name
  name: number;
  // partition count
  partition: string;
  // replication factor
  replication: string;
}

type Props = {
  [key: string]: any;
};

const TopicConfig: React.FC<Props> = (props: Props) => {
  const [config, setConfig] = useState<ConfigModel>({
    name: null,
    partition: '',
    replication: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const updateConfig = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    fetch('/createTopics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: config.name,
        partition: config.partition,
        replication: config.replication,
      }),
    }).then((res) => {
      setLoading(false);
      if (res.ok) {
        props.updateTopicList();
        setError('');
      } else {
        setError('Error in creating topic');
      }
    });
  };

  return (
    <PopupContainer>
      <StyledLabeledInput
        vertical
        name={'name'}
        labelText={'Topic Name'}
        toolTipText={'Provide a Topic Name (e.g. Test_Topic)'}
        onChange={updateConfig}
      />
      <StyledLabeledInput
        vertical
        name={'partition'}
        labelText={'Partition Count'}
        toolTipText={'Provide the desired # of Partitions (e.g. 5)'}
        onChange={updateConfig}
      />
      <StyledLabeledInput
        vertical
        name={'replication'}
        labelText={'Replication Factor'}
        toolTipText={'Provide the desired # of Replicas (e.g. 3)'}
        onChange={updateConfig}
      />
      {loading ? (
        <Loader
          type='TailSpin'
          color={constants.LIGHTER_GREEN}
          height={30}
          width={30}
        />
      ) : (
        <Button onClick={handleSubmit}>Create Topic</Button>
      )}
      {error.length > 0 && <div>{error}</div>}
    </PopupContainer>
  );
};

export default TopicConfig;
