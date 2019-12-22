import util from '../libs/axios'
export function getBanner (params) {
  return util.get('/banner', { params })
}

/**
 * ��ȡ�赥
 * @param order // new hot ��Ӧ���º�����
 * @param cat // tag ����
 * @param limit // ����
 */
export function getPlayList (params) {
  return util.get('/top/playlist', { params })
}

/**
 * ��ȡ�赥����
 * @param params 
 */
export function getPlayListCatList (params) {
  return util.get('/playlist/catlist', { params })
}

/**
 * ��ȡ���Ÿ赥����
 * @param params 
 */
export function getPlayListHot (params) {
  return util.get('/playlist/hot', { params })
}

/**
 * ��ȡ�����µ�/����ר��
 * @param params 
 */
export function getAlbumNewest (params) {
  return util.get('/album/newest', { params })
}

// �Ƽ��赥/personalized�Լ��Ƽ���̨/personalized/djprogram   limit//����

/**
 * �Ƽ��赥
 * @param 
 */
export function getPersonalized (params) {
  return util.get('/personalized', { params })
}

/**
 * �Ƽ���̨
 * @param
 */
export function getDJprogram (params) {
  return util.get('/personalized/djprogram', { params })
}

/**
 * ��ȡ��Ӧ���µĸ���
 * @param idx // ��id
 */
export function getTopSongList (params) {
  return util.get('/top/list', { params })
}

/**
 * ��ȡ������ժҪ
 */
export function getTopListDetail (params) {
  return util.get('/toplist/detail', { params })
}

/**
 * ��ȡ���а�
 */
export function getTopList (params) {
  return util.get('/toplist', { params })
}

/**
 * ��ȡ��פ����
 * cat �������� 5001 => ��פ����
 */
export function getArtistSettinList (params) {
  return util.get('/artist/list', { params })
}

/**
 * ��ȡ�赥����
 * id �赥id
 */
export function getPlayListDetail (params) {
  return util.get('/playlist/detail', { params })
}

/**
 * ��ȡ����url
 * id ���� id
 */
export function getSongUrl (params) {
  return util.get('/song/url', { params })
}

