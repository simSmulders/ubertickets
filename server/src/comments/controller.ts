import { JsonController, Get, Post, HttpCode, Body, Patch, Param, NotFoundError } from 'routing-controllers'
import { Comment } from './entities'
import { io } from '../index';


@JsonController()
export default class CommentController {

    @Get('/comments')
    async allComments() {
        const comments = await Comment.find()
        return { comments }
    }

    @Get('/comments/:id([0-9]+)')
    getComment(
        @Param('id') id: number
    ) {
        return Comment.findOneById(id)
    }

    @Post('/comments')
    @HttpCode(201)
    createComment(
        @Body() comment: Comment
    ) {
        io.emit('action', {
            type: 'ADD_COMMENT',
            payload: comment
          })
    return comment.save()
    }   

    @Patch('/comments/:id([0-9]+)')
    async updateComment(
        @Param('id') commentId: number,
        @Body() update: Partial<Comment>
    ) {
        const comment = await Comment.findOneById(commentId)
        if (!comment) throw new NotFoundError('Cannot find comment')

        return Comment.merge(comment, update).save()
    }
}
 

