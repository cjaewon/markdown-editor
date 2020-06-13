import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import PublishActionButtons from '../../components/write/PublishActionButtons';
import { closePublish, WriteMode } from '../../modules/write';
import {
  WRITE_POST,
  WritePostResponse,
  EditPostResult,
  EDIT_POST,
} from '../../lib/graphql/post';
import { pick } from 'ramda';
import { escapeForUrl, safe } from '../../lib/utils';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { setHeadingId } from '../../lib/heading';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

type PublishActionButtonsContainerProps = {};

const PublishActionButtonsContainer: React.FC<PublishActionButtonsContainerProps> = () => {
  const history = useHistory();
  const client = useApolloClient();

  const options = useSelector((state: RootState) =>
    pick(
      [
        'mode',
        'markdown',
        'title',
        'html',
        'tags',
        'defaultDescription',
        'description',
        'isPrivate',
        'urlSlug',
        'thumbnail',
        'selectedSeries',
        'postId',
        'isTemp',
      ],
      state.write,
    ),
  );
  const dispatch = useDispatch();

  const onCancel = useCallback(() => {
    dispatch(closePublish());
  }, [dispatch]);

  const [writePost] = useMutation<WritePostResponse>(WRITE_POST);
  const [editPost] = useMutation<EditPostResult>(EDIT_POST);

  const variables = {
    title: options.title,
    body:
      options.mode === WriteMode.MARKDOWN
        ? options.markdown
        : setHeadingId(options.html),
    tags: options.tags,
    is_markdown: options.mode === WriteMode.MARKDOWN,
    is_temp: false,
    is_private: options.isPrivate,
    url_slug: options.urlSlug || escapeForUrl(options.title),
    thumbnail: options.thumbnail,
    meta: {
      short_description: options.description,
    },
    series_id: safe(() => options.selectedSeries!.id),
  };

  const onPublish = async () => {
    if (options.title.trim() === '') {
      toast.error('제목이 비어있습니다.');
      return;
    }
    try {
      const response = await writePost({
        variables: variables,
      });
      if (!response || !response.data) return;
      const { user, url_slug } = response.data.writePost;
      await client.resetStore();
      history.push(`/@${user.username}/${url_slug}`);
    } catch (e) {
      toast.error('포스트 작성 실패');
    }
  };

  const onEdit = async () => {
    const response = await editPost({
      variables: {
        id: options.postId,
        ...variables,
      },
    });
    if (!response || !response.data) return;
    const { user, url_slug } = response.data.editPost;
    await client.resetStore();
    history.push(`/@${user.username}/${url_slug}`);
  };

  return (
    <PublishActionButtons
      onCancel={onCancel}
      onPublish={options.postId ? onEdit : onPublish}
      edit={!!options.postId && !options.isTemp}
    />
  );
};

export default PublishActionButtonsContainer;
