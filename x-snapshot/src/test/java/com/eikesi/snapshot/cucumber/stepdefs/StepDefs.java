package com.eikesi.snapshot.cucumber.stepdefs;

import com.eikesi.snapshot.SnapshotApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = SnapshotApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
