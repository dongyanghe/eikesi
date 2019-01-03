package com.eikesi.im.cucumber.stepdefs;

import com.eikesi.im.ImWebApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = ImWebApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
