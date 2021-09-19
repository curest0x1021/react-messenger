import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import Lightbox from "../Lightbox";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    index: 0,
    images: [],
  });

  const handleOpenLightbox = (attachments, index) => {
    setLightbox({
      isOpen: true,
      index: index,
      images: attachments
    });
  }

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} attachments={message.attachments} openLightbox={handleOpenLightbox}/>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} attachments={message.attachments} openLightbox={handleOpenLightbox}/>
        );
      })}
      {lightbox.isOpen &&
        <Lightbox
          mainSrc={lightbox.images[lightbox.index]}
          nextSrc={lightbox.index < lightbox.images.length - 1 ? lightbox.images[(lightbox.index + 1) % lightbox.images.length] : null}
          prevSrc={lightbox.index > 0 ? lightbox.images[(lightbox.index + lightbox.images.length - 1) % lightbox.images.length] : null}
          onCloseRequest={() => setLightbox({ isOpen: false, index: 0, images: [] })}
          onMovePrevRequest={() =>
            setLightbox({
              ...lightbox,
              index: (lightbox.index + lightbox.images.length - 1) % lightbox.images.length
            })
          }
          onMoveNextRequest={() =>
            setLightbox({
              ...lightbox,
              index: (lightbox.index + 1) % lightbox.images.length,
            })
          }
        />
      }
    </Box>
  );
};

export default Messages;
