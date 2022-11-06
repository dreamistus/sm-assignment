import Input from 'components/Input';
import { Sender } from 'types/posts';

import styles from './Senders.module.scss';
import SenderItem from './SenderItem';

interface SendersProps {
  senders: Sender[];
  selectedSenderId?: string;
  page?: string;
  handleSenderNameFilterChanged: React.ChangeEventHandler<HTMLInputElement>;
}

const Senders: React.FC<SendersProps> = ({
  senders,
  selectedSenderId,
  page,
  handleSenderNameFilterChanged
}) => (
  <aside>
    <div className={ styles.panel }>
      <header className={ styles.header }>
        <Input placeholder="Search sender" stretch onChange={ handleSenderNameFilterChanged } />
      </header>
      <ul className={ styles.list }>
        { senders.map(sender => (
          <SenderItem
            key={ sender.id }
            isSelected={ selectedSenderId === sender.id }
            currentPage={ page }
           // eslint-disable-next-line react/jsx-props-no-spreading
            { ...sender }
          />
        )) }
      </ul>
    </div>
  </aside>
);

export default Senders;
