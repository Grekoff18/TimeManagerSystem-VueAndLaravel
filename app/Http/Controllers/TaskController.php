<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Carbon;
use Mockery\Undefined;

class TaskController extends Controller
{

  public function index()
  {
      return Task::orderBy("created_at", "DESC")->get();
  }

  public function create()
  {

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

  public function edit(Request $request, $id)
  {
    $selecting_task = Task::find($id);
    if ($selecting_task) {
      if (isset($request->task["completed"])) {
        $selecting_task->completed = $request->task["completed"];
      }

      if (isset($request->task["description"])) {
        $selecting_task->description = $request->task["description"];
      }

      $selecting_task->save();

      return $selecting_task;
    }

    return "Task desc not found";
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
