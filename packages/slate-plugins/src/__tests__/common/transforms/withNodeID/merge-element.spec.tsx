/** @jsx jsx */

import { jsx } from '__test-utils__/jsx';
import { idCreatorFixture } from '__tests__/common/transforms/withNodeID/fixtures';
import { withNodeID } from 'common/transforms/node-id';
import { Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { HistoryEditor } from 'slate-history/dist/history-editor';

const input = ((
  <editor>
    <hp id={1}>one</hp>
    <hp id={2}>two</hp>
  </editor>
) as any) as Editor;

const output = (
  <editor>
    <hp id={1}>one</hp>
    <hp id={2}>two</hp>
  </editor>
) as any;

it('should recover the ids', () => {
  const editor: HistoryEditor = withNodeID({
    idCreator: idCreatorFixture,
  })(withHistory(input));

  Transforms.mergeNodes(editor, { at: [1] });
  editor.undo();
  editor.redo();
  editor.undo();

  expect(input.children).toEqual(output.children);
});
