const getPublicIds = (images) => {
  const public_ids = images.map(image => {
    const origin = image;
    const slash_split = origin.split('/');
    const public_id_slice = slash_split.slice(slash_split.length - 3, slash_split.length);
    const image_id = public_id_slice[public_id_slice.length - 1].split('.')[0];
    const public_id = `${public_id_slice[0]}/${public_id_slice[1]}/${image_id}`;
    return public_id;
  });
  return public_ids;
};

module.exports = getPublicIds;