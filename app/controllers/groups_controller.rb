class GroupsController < ApplicationController

  def new
  end

  def create
    @group = Group.new(group_params)
    @group.user_id = current_user.id
    @group.save
    redirect_to group_path
  end

  def edit
  end

  def update
  end

  private
  def group_params
    params.require(:group).permit(:name)
  end

end
