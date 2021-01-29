<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Carbon;

class TaskController extends Controller
{

  public function index()
  {
      return Task::orderBy("created_at", "DESC")->get();
  }


  public function create()
  {
      //
  }

  public function store(Request $request)
  {
    $new_task = new Task();
    $new_task->description = $request->task["description"];
    $new_task->save();

    return $new_task;
  }


  public function show($id)
  {

  }


  public function edit($id)
  {


  }


  public function update(Request $request, $id)
  {
    $existing_task = Task::find($id);

    if ($existing_task) {
      $existing_task->completed = $request->task["completed"] ? true : false;
      $existing_task->completed_at = $request->task["completed"] ? Carbon::now() : null;
      $existing_task->save();

      return $existing_task;
    }

    return "Task not found.";
  }

  public function destroy($id) {
    $existing_task = Task::find($id);
    if ($existing_task) {
      $existing_task->delete();
      return "Task successfully deleted";
    }

    return "Task not found.";
  }
}
