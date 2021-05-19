export const connectStatus = (myInfo = {}, partnerInfo = {}) => {
  // if connected
  if (
    partnerInfo?.connections?.some((connection) => connection.id === myInfo?.id)
  )
    return "CONNECTED";

  // if not connected
  /// a) sent connect and waiting for accept
  const partnerActivities = partnerInfo?.activities?.filter(
    (activity) => activity.type === "sendConnReq"
  );
  if (
    partnerActivities?.some(
      (activity) => activity.info.sender.id === partnerInfo?.id
    )
  )
    return "PARTNER_WAIT_FOR_ACCEPT"; // partner sent me connection and waiting for me to accept

  const partnerNotifications = partnerInfo?.notifications?.filter(
    (noti) => noti.type === "sendConnReq"
  );
  if (partnerNotifications?.some((noti) => noti.info.sender.id === myInfo?.id))
    return "ME_WAIT_FOR_ACCEPT"; // I sent partner connection and waiting for him to accept

  /// b) not sent connect to each other
  return "NOT_CONNECTED";
};
