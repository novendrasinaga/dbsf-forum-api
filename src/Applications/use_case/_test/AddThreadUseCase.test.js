const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const mockThreadRepository = new ThreadRepository();
    const mockReturnAddedThread = new AddedThread({
      id: 'thread_1',
      title: 'title 1',
      owner: 'user_1',
    });

    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockReturnAddedThread));

    const useCaseAddThread = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const useCasePayload = {
      title: 'title 1',
      body: 'body',
      owner: 'user_1',
    };

    const expectedAddedThread = new AddedThread({
      id: 'thread_1',
      title: 'title 1',
      owner: 'user_1',
    });

    // Action
    const addedThread = await useCaseAddThread.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
  });
});
